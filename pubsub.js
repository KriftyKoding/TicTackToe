var pubsubs = {
    pubsubs: {}, 
    // subscribe to event
    on: function (eventName, fn) {
      this.pubsubs[eventName] = this.pubsubs[eventName] || [];
      this.pubsubs[eventName].push(fn);
    },
    //unsubscribe to event
    off: function(eventName, fn) {
      if (this.pubsubs[eventName]) {
        for (var i = 0; i < this.pubsubs[eventName].length; i++) {
          if (this.pubsubs[eventName][i] === fn) {
            this.pubsubs[eventName].splice(i, 1);
            break;
          }
        };
      }
    },
    // create event
    emit: function (eventName, data) {
      if (this.pubsubs[eventName]) {
        this.pubsubs[eventName].forEach(function(fn) {
          fn(data);
        });
      }
    }
  };