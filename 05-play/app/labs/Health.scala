package labs

import fly.play.elasticsearch.Client
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import scala.concurrent.Await
import scala.concurrent.duration.DurationInt

/*
 * The easiest way to run this is from Eclipse, not from sbt.
 * The program never terminates, why is that?
 */

object Health extends App {
  val esClient = new Client("http://localhost:9200")
  Await.result(esClient.health.map(json => println(json.toString)), 30.seconds)
  sys.exit()
}
