package labs

import play.api.libs.concurrent.Execution.Implicits.defaultContext
import scala.concurrent.{Await, Future}
import scala.concurrent.duration.DurationInt
import stores.EventStore

object EventIndexer extends App {
  val store = new EventStore("rock_festival")
  val festivals = testdata.Events.list

  // Index the events.
  // Check the number of indexed events, using the search method with a MatchAllQuery.
}
