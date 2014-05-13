package labs

import stores.EventStore

object EventIndexer extends App {
  val store = new EventStore("rock_festival")
  val festivals = testdata.Events.list

  // Add settings to the EventStore.
  // Use the Event.esMapping for the EventStore.
  // Index the events.
}
