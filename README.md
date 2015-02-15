# Orb.Zone &rarr; _Gamified DataVis Tools_

This project is a collection of web components used to present insightful and entertaining views of complex datasets.  It is a mission to bring order out of chaos, by simplifying the process to track streams of event occurrences and represent this model to authorized users by leveraging several open-source technologies.

![Orb.Zone Logo](https://raw.githubusercontent.com/travenasty/orb.zone/30144be44252482fb39b59199296b7f18c576e56/docs/orb-zone-logo-500.png)

<br>
---

### Component Model

Components are constructed to be similar to game-mechanic tools such as cards, dice, and decks so it is easy to reason about the stacks of information at hand, simple to cycle through, and structured into groups that create formulas which drive outcomes.

> User, Rule, Form, List, Grid, Tile, Coin, Cube, Dice, Card, Hand, Deck, Team, Game, Task, Vote, Test, Rank, Page, Book, Logo, and more.

<br>
---

### Rule Driven Results

Each Zone is governed by its own set of requirements that sort and segment the items being displayed and which form fields are available by permission.  Sequences of these change-sets are broadcast through the API when appropriate conditions are met, immediately communicated to other connected parties.  Keeping everyone in sync.

<br>
---

### Launchpad Interaction

The UI is driven by outputs from configurable render state parameters, and conditions of each of these views is emitted out as MIDI data channels.  This feedback can be integrated into the color LED button grid of an external launchpad device so that you can at a glance be alerted to important thresholds and tap on the corresponding lit button to jump to interesting displays of your live model.

* **Node Midi Launchpad** – https://github.com/sydlawrence/node-midi-launchpad

<br>
---

### Software Techniques

**Offline first**, the client holds onto a whole representation of the working-model (as much as the user is granted access) so that any decision can be made without the need of fetching additional resources.  Each client can operate without a network connection, and essentially continue where it left off when connected.

* **HTML5 Storage** – https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage

**Built with accessibility in mind**, the controls are designed to work via keyboard, touch or mouse and incorporate audio and visual inputs/outputs through HTML5 based WebAudio and WebRTC standards.

* **A11y** – https://developer.mozilla.org/en-US/docs/Web/Accessibility
* **WebAudio API** – http://webaudio.github.io/web-audio-api
* **WebMidi API** – http://webaudio.github.io/web-midi-api

**Reactive**, the audio and visual output produced is a direct result of the collections being monitored, these streams of information are immutable, reflected into views by map-reduced patterns and constraints.  Entirely Data-driven.

* **Reactive Manifesto** – http://www.reactivemanifesto.org

<br>
---

### 3rd Party Libraries

This project is made possible by combining and building upon the foundation of several external projects.

* **MsgPack** – Compact data exchange format – http://msgpack.org
* **WebPack** – Module bundler and loader – https://github.com/webpack/webpack
* **Angular2** – UI glue and URL router – https://github.com/angular/angular
* **Socket.IO** – Live data channels – http://socket.io
* **IO.JS** – Service endpoint API – https://iojs.org
* **Redis** – Data persistence – http://redis.io
* **Juju** – Host manager – https://juju.ubuntu.com
