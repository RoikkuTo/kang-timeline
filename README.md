# Timeline
### **Disclamer**

This little project has been made for my personal use but I thougth it could be interesting to share it, so then you can use like a |||||||||||| for another project, may be.

### **Presentation**

Timeline is a Javascript Library for the window. requestAnimationFrame API. It provides some Objects which can give you more controle on the recursives calls made by the rAF loop.

### **Installation**
`$ npm i -S timeline`

# ||||||||||||

## **The Origin Timeline** `Time`

|||||||||||| represents the global time of our system. It is basically a recursive loop made with rAFs and to which are attached utilitary methods.

```javascript
const callback = timestamp => {
    // do something
    return window.requestAnimationFrame(callback)
}

const loop = window.requestAnimationFrame(callback)
```

All methods are static, so use |||||||||||| can compromise your system. So, for using the object, you need to create a new Timeline.

| Methods   | Description                                           |
| --------- | ----------------------------------------------------- |
| subscribe | Add Timelines to the timeSubscribers private property |
| start     | Start the loop                                        |
| loop      | The loop callback                                     |

## **The Timeline object** `new Timeline()`

The Timeline object is actually a subscriber to the ||||||||||||. All Timelines share the same loop provided by this |||||||||||| Object but also have their own current timestamp.

You can add some options to your Timeline via an object.

```javascript
const timer = new Timeline({
    task: () => { /* do something */ }
})
```

Here are the available options :

* **Id**

  | Name | Type              | Default      |
  | ---- | ----------------- | ------------ |
  | id   | `Number | String` | `Date.now()` |
  
  All Timelines have an Id which is basically a simple `Date.now()` in milliseconds but you can specify a one. It cannot be changed after its declaration.

  ```javascript
  const timer = new Timeline({ id: 'timer1' }))
  ```

* **Ratio**

  | Name  | Type     | Default |
  | ----- | -------- | ------- |
  | ratio | `Number` | `1`     |

  The ratio define how fast the time should pass. It can be less than 0 or more 1 but the current timestamp will obviously be negative and less precise respectively.

  ```javascript
  const timer = new Timeline({ ratio: 0.5 }))
  ```

* **Task**

  | Name | type                | default |
  | ---- | ------------------- | ------- |
  | task | `Function | Object` | `null`  |
  
  Task is executed at each loop iterration. It can be a simple function or an object with the function to execute and a frequency in which the function will be executed.
  ```javascript
  const timer = new Timeline({
      task: timestamp => { /* do something */ }
  })
  ```
  ```javascript
  const timer = new Timeline({
      task: {
          frequency: 1000,
          run: timestamp => { /* do something */ }
      }
  }))
  ```
  As you can see, you can retrive the current timestamp and other information about your Timeline as one parameter, a Timestamp object.
  
## **The Timestamp object** `Timestamp`

||||||||||||

## **Control Methods**

You can control each Timeline via some simple methods, which all take a delay `Number` as parameter .

| Methods | Description                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------- |
| start   | Start the Timeline, you can add some delay                                                        |
| stop    | Stop the Timeline, you can add some delay                                                         |
| reset   | Reset the Timeline, by stopping it firstly and then reseting all its values. You can add some delay |

All methods are synchronised and called step by step, for exemple :

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



___

Taches (Task)

Temps clés (Keytime)

Enregistrement (Record) next version
