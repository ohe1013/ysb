const PROMISE_STATE = Object.freeze({
    pending: "PENDING",
    fulfilled: "fulfilled",
    rejected: "rejected",
});

class MyPromise {
    #value = null;
    #state = PROMISE_STATE.pending;
    #thenCallbacks = [];
    #catchCallbacks = [];
    constructor(executor) {
        console.log(executor)
        try {
            executor(this.#resolve.bind(this), this.#reject.bind(this));
        } catch (error) {
            this.#reject(error);
        }
    }
    #resolve(value) {
        this.#update(PROMISE_STATE.fulfilled,value)
    }
    #reject(error) {
        this.#update(PROMISE_STATE.rejected,error)
    }
    #runCallbacks () {
        if (this.#state === PROMISE_STATE.fulfilled) {
            this.#thenCallbacks.forEach((callback) => callback(this.#value))
            this.#thenCallbacks = []
        }
        if (this.#state === PROMISE_STATE.rejected) {
            this.#catchCallbacks.forEach((callback) => callback(this.#value))
            this.#catchCallbacks = []
        }
    }

    #update(state, value) {
        queueMicrotask(() => {
            if(this.#state !== PROMISE_STATE.pending) return;
            this.#state = state;
            this.#value = value;
            this.#runCallbacks();
        })
    }

    // #asyncResolve(callback) {
    //     if( this.#state === PROMISE_STATE.pending) {
    //         return new MyPromise( (resolve)=>{ 
    //             console.log(1)
    //             this.#thenCallbacks.push(()=> resolve(callback(this.#value)))
    //         })
    //     }
    //     return null;
    // }
    // #syncResolve(callback) {
    //     if( this.#state === PROMISE_STATE.fulfilled) {
    //         console.log(2)
    //         return new MyPromise((resolve) => resolve(callback(this.#value)))
    //     }
    //     return null;
    // }

    then(thenCallback, catchCallback) {
        return new MyPromise((resolve,reject) => {
            this.#thenCallbacks.push((value) => {
                if(!thenCallback) {
                    resolve(value);
                    return;
                }
                try {
                    resolve(thenCallback(value))
                } catch (error) {
                    reject(error)
                }
            })
            this.#catchCallbacks.push((value) => {
                if(!catchCallback){
                    reject(value)
                    return;
                }
                try {
                    resolve(catchCallback(value))
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
    catch(catchCallback) {
        return this.then(undefined,catchCallback)
    }
}

function testMyPromise(input) {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            if (input === 1) {
                resolve("성공");
            } else if (input === 2) reject("실패");
        }, 1000);
    });
}
testMyPromise(1)
    .then((value) => {
        console.log(value);
        return "체이닝 되나 ?";
    })
    .then((v) => console.log(v))
