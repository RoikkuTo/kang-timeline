# Timeline

> **Disclamer :** This little project has been made for my personal use but I thougth it could be interesting to share it.

### Presentation

Timeline is a Javascript Library for the [`window.requestAnimationFrame()`](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame) API. It provides some Objects which can give you more controle on the recursives calls made by a `requestAnimationFrame` (or _rAF_ for short) loop.

### Installation

```bash
$ npm i -S timeline
```

### Import

You can import the library as an es module :

```javascript
import Timeline from 'timeline'
```

Or via the exposed varible umd :

```html
<script src="/path/to/timeline.min.js"></script>
```

```javascript
const { Timeline } = umd
const timer = new Timeline()
```

# Objects and Methods

-   **[The Provider `TimeProvider`](#the-provider-timeprovider)**
-   **[The Timeline object `new Timeline()`](#the-timeline-object-new-timeline)**
    -   [`id`](#id)
    -   [`speed`](#speed)
    -   [`task`](#task)
-   **[The Timestamp object `Timestamp`](#the-timestamp-object-timestamp)**
-   **[Control Methods](#control-methods)**
-   **[Key Times methods](#key-times-methods)**
    -   [`Timestamp.addKeytime([ Object | Array ])`]()
    -   [`Timestamp.removeKeytimes([ Number | String | Array ])`]()
    -   [`Timestamp.listKeytimes()`](#timestamplistkeytimes)
-   **[Todolist](#todolist)**

# The Provider `TimeProvider`

`TimeProvider` represents the global time of our system. It is basically a recursive loop made with rAFs and to which are attached utilitary methods.

```javascript
// Basic rAF loop

const callback = ts => {
	// do something
	return window.requestAnimationFrame(callback)
}

const loop = window.requestAnimationFrame(callback)
```

All methods are static and so utilitary. Using `TimeProvider` can compromise your system. For using the object, you need to create a new **Timeline**.

| Methods   | Description                                           |
| --------- | ----------------------------------------------------- |
| subscribe | Add Timelines to the timeSubscribers private property |
| start     | Start the loop                                        |
| loop      | The loop callback                                     |

# The Timeline object `new Timeline()`

The Timeline object is actually a subscriber to the `TimeProvider`. All Timelines share the same loop provided by the TimeProvider Object but also have their own current timestamp.

You can add some options to your Timeline by passing an object as argument, or by setting those options afterward via methods.

```javascript
// by argument
const timer = new Timeline({
	task: () => {
		/* do something */
	}
})

// OR by method
const timer = new Timeline()
timer.setTask(() => {
	/* do something */
})
```

### `id`

| Name    | Type    | Default      |
| ------- | ------- | ------------ |
| `Number | String` | `Date.now()` |

All Timelines have a unique _id_ which is basically a simple `Date.now()` in milliseconds but you can specify a one.

```javascript
const timer = new Timeline({ id: 'timer1' }))
```

### `speed`

| Name  | Type     | Default |
| ----- | -------- | ------- |
| speed | `Number` | `1`     |

The speed define how fast the time should pass. It can be less than 0 or greater than 1 but the current timestamp will obviously be negative and less precise respectively.

```javascript
const timer = new Timeline({ speed: 0.5 }))
```

### `task`

| Name | Type                         | default |
| ---- | ---------------------------- | ------- |
| task | `Function \| Object \| null` | `null`  |

Task is executed at each loop iterration. It can be a simple function or an object with a function to execute at a given frequency.

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
        frequency: 1000, // each second
        run: timestamp => { /* do something */ }
    }
}))
```

As you can see, you can retrive the current timestamp and other informations about your Timeline as the argument described [further below](#the-timestamp-object-timestamp).

### `range`

| Name  | Type                                 | default |
| ----- | ------------------------------------ | ------- |
| range | `number \| [number, number] \| null` | `null`  |

A range between which the timeline will be effective, with the first index being the _minimum_ and the second being the _maximum_. If set as a number, the range become `[0, number]` with 0 as minimum.

# The Timestamp object `Timestamp`

Because each Timeline are based on a provided time, you can access to some informations about your Timeline throught the unique parameter of a task.

| Properties  | Type     | Description                                         |
| ----------- | -------- | --------------------------------------------------- |
| currentTime | `Number` | The current timestamp of your Timeline              |
| globalTime  | `Number` | The global timestamp, offered by the `TimeProvider` |

# **Control Methods**

You can control each Timeline by simple methods, which all can take a delay and a callback as parameters.

| Methods | Description                                                                  |
| ------- | ---------------------------------------------------------------------------- |
| start   | Start the Timeline                                                           |
| stop    | Stop the Timeline                                                            |
| reset   | Reset the Timeline, by stopping it firstly and then reseting all its values. |

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

# Key Times methods

### `Timestamp.addKeytime([ Object | Array ])`

A key time trigger a callback at a specifed timestamp. You can multiple key times by passing an array to the method.

| Properties | Type               | Description            |
| ---------- | ------------------ | ---------------------- |
| id         | `Number \| String` | A unique id            |
| timestamp  | `Number`           | The targeted timestamp |
| task       | `Function`         | The callback to run    |

```javascript
// We create our Timeline instance
const timer = new Timeline()

// And we add a keytime
timer.addKeytime({
  id: 'log-0',
  timestamp: 5000
  task: timestamp => {
    console.log(timestamp)
  }
})
```

Usually, the targeted timestamp and the actual execution timestamp have a delta of ||||||||||||||||||

### `Timestamp.removeKeytimes([ Number | String | Array ])`

Remove key times by their _id_.

```javascript
// Our "log-0" key time is still there
// Let's remove it
timer.removeKeytime('log-0')
```

### `Timestamp.listKeytimes()`

Also you can list all your keytimes by this method. They will be listed in order to their timestamp.

```javascript
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
  }
]
*/
```

# Todolist

-   [ ] Add a demo page
-   [ ] Add a record solution (method) to extract our timelines and replay, pause, modify them on demand. This could be a good feature for animators
-   [x] Add types
