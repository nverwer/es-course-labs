package labs

import fly.play.elasticsearch.Client
import play.api.libs.concurrent.Execution.Implicits.defaultContext

object Health extends App {
  val esClient = new Client("http://localhost:9200")
  esClient.health.map(json => println(json.toString))
}
