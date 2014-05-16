package labs

import play.api.libs.concurrent.Execution.Implicits.defaultContext
import scala.concurrent.{Await, Future}
import scala.concurrent.duration.DurationInt
import stores.EventStore

object EventIndexer extends App {
  val store = new EventStore("rock_festival")
  val festivals = testdata.Events.list

  // Add settings to the EventStore.
  // Use the Event.esMapping for the EventStore.
  // Index the events.
  Future.sequence(festivals map {store save _}) map {results =>
    println("Indexed "+results.size+" out of "+festivals.size)
    sys.exit()
  }
}
