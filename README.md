# Timeline

### **Disclamer**

This little project has been made for my personal use but I thougth it could be interesting to share it, so then you can use like a `TimeProvider` for another project, may be.

### **Presentation**

Timeline is a Javascript Library for the window. requestAnimationFrame API. It provides some Objects which can give you more controle on the recursives calls made by the rAF loop.

### **Installation**

`$ npm i -S timeline`

### **Import**

You can import the library as an es module :

```javascript
import Timeline from 'timeline'
```

Or via the exposed varible umd :

```html
<script src="/path/to/timeline.umd.js"></script>
```

```javascript
const { Timeline } = umd
const timer = new Timeline()
```

# Objects and Methods

## **The Provider** `TimeProvider`

`TimeProvider` represents the global time of our system. It is basically a recursive loop made with rAFs and to which are attached utilitary methods.

```javascript
// Basic rAF loop

const callback = ts => {
	// do something
	return window.requestAnimationFrame(callback)
}

const loop = window.requestAnimationFrame(callback)
```

All methods are static and so utilitary. Using `TimeProvider` can compromise your system. For using the object, you need to create a new Timeline.

| Methods   | Description                                           |
| --------- | ----------------------------------------------------- |
| subscribe | Add Timelines to the timeSubscribers private property |
| start     | Start the loop                                        |
| loop      | The loop callback                                     |

## **The Timeline object** `new Timeline()`

The Timeline object is actually a subscriber to the `TimeProvider`. All Timelines share the same loop provided by the TimeProvider Object but also have their own current timestamp.

You can add some options to your Timeline via an object, or you can call those options as methods.

```javascript
// by argument
const timer = new Timeline({
	task: () => {
		/* do something */
	}
})

// OR by method
const timer = new Timeline()
timer.task(() => {
	/* do something */
})
```

Here are the available options :

-   **Id**

    | Name | Type    | Default |
    | ---- | ------- | ------- | ------------ |
    | id   | `Number | String` | `Date.now()` |

    All Timelines have a unique Id which is basically a simple `Date.now()` in milliseconds but you can specify a one.

    ```javascript
    const timer = new Timeline({ id: 'timer1' }))
    ```

-   **Ratio**

    | Name  | Type     | Default |
    | ----- | -------- | ------- |
    | ratio | `Number` | `1`     |

    The ratio define how fast the time should pass. It can be less than 0 or more 1 but the current timestamp will obviously be negative and less precise respectively.

    ```javascript
    const timer = new Timeline({ ratio: 0.5 }))
    ```

-   **Task**

    | Name | Type      | default |
    | ---- | --------- | ------- | ------ |
    | task | `Function | Object` | `null` |

    Task is executed at each loop iterration. It can be a simple function or an object with the function to execute and a frequency in which the function will be executed.

    ```javascript
    const timer = new Timeline({
    	task: ts => {
    		/* do something */
    	}
    })
    ```

    ```javascript
    const timer = new Timeline({
        task: {
            frequency: 1000,
            run: ts => { /* do something */ }
        }
    }))
    ```

    As you can see, you can retrive the current timestamp and other information about your Timeline as one parameter, a Timestamp object.

## **The Timestamp object** `Timestamp`

Because each Timeline are based on a provided time, you can access to some informations about your Timeline throught the unique parameter of a task, the `Timestamp` Object.

| Properties  | Type     | Description                                         |
| ----------- | -------- | --------------------------------------------------- |
| currentTime | `Number` | The current timestamp of your Timeline              |
| globalTime  | `Number` | The global timestamp, offered by the `TimeProvider` |

## **Key Times methods**

-   **Add key times** `Timestamp.addKeytime([ Object || Array ])`

    The key times trigger a callback at a specifed timestamp or each specifed timestamp. The method takes one parameter, an Object.

    | Properties | Type       | Description          |
    | ---------- | ---------- | -------------------- | ----------- |
    | id         | `Number    | String`              | A unique id |
    | timestamp  | `Number`   | The target timestamp |
    | run        | `Function` | The callback to run  |

    (We use the `run` as the callback... name to change a little bit 😊)

    ```javascript
    // We create our Timeline instance
    const timer = new Timeline()

    // And we add a keytime
    timer.addKeytime({
      id: 'log-0',
      timestamp: 5000
      run: ts => {
        console.log(timestamp)
      }
    })
    ```

    With this exemple, you can directly compare how different the result is compared to the target. Usually its

-   **Remove key times** `Timestamp.removeKeytimes([ Number | String | Array ])`

    Remove key times by their id.

    ```javascript
    // Our "log-0" key time is still there
    // Let's remove it
    timer.removeKeytime('log-0')
    ```

-   **List key times** `Timestamp.listKeytimes()`

    Also you can list all your keytimes by this method. They will be listed in order to their timestamp.

    ```javascript
    // No way, they want to renvenge

    const list = timer.listKeytimes()

    console.log(list)
    /* Output
    [
      {
        id: "log-1",
        timestamp: 5000,
        run: ts => { console.log(ts) }
      },
      {
        id: "log-3",
        timestamp: 8000,
        ...
      },
      {
        id: "log-2",
        timestamp: 1400,
        ...
      }
    ]
    */
    ```

## **Control Methods**

You can control each Timeline via some simple methods, which all take a delay `Number` as parameter .

| Methods | Description                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------- |
| start   | Start the Timeline, you can add some delay                                                          |
| stop    | Stop the Timeline, you can add some delay                                                           |
| reset   | Reset the Timeline, by stopping it firstly and then reseting all its values. You can add some delay |

All methods are "stackable" and called "stack by stack", for exemple :

```javascript
// Create a new Timeline
const timer = new Timeline()

// One by one :
// 1. start the Timeline
timer.start()
// 2. stop the Timeline after 5 seconds
timer.stop(5000)
// 3. reset the Timeline after 1 second
timer.reset(1000)

// Or in chain :
timer.start().stop(5000).reset(1000)
```

## **Demo**

A demo is accessible in the _test_ folder of the repot

# Todolist

-   [ ] Add a demo page
-   [ ] Add a record solution (method) to extract our timelines and replay, pause, modify them on demand. This could be a good feature for animators
-   [*] Add types
