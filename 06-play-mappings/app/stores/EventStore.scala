package stores

import fly.play.elasticsearch.{Client, SearchResult, Settings}
import fly.play.elasticsearch.mapping.Mapping
import fly.play.elasticsearch.query.{MatchAllQuery, Query}
import models.Event
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import scala.concurrent.duration.DurationInt
import scala.concurrent.{Await, Future}

class EventStore(eventType: String, mapping: Mapping) {
  val esClient = new Client("http://localhost:9200")
  val esIndex = esClient("events")
  val esType = esIndex(eventType)

  val settings = Settings(); // Add settings if you wish!

  def initialize: Unit = {

    def createIndex = esIndex.exists flatMap {
      if (_) // Index already exists.
        Future.successful(())
      else { // Create index.
        // Wait for the index creation process to finish. See https://github.com/elasticsearch/elasticsearch/issues/2527
        esIndex.create(settings) flatMap { _ => esClient.health("wait_for_status" -> "yellow") }
      }
    }

    // Wait until the index has been created before doing anything with it, like defining a mapping.
    Await.result(createIndex, 10.seconds)

    def defineMapping =
      esType.mappingOpt flatMap {
        case Some(_) => Future.successful(()) // Mapping for this type is already defined.
        case None => {
          esType.create(mapping); // Define the mapping.
        }
      }

    // Wait until the mapping has been defined, before trying to index anything of type typeName.
    Await.result(defineMapping, 10.seconds)

    ()

  }

  def getById(id: String): Future[Option[Event]] = esType.get[Event](id)

  def list(size: Int): Future[Seq[Event]] =
    esType.search[Event](MatchAllQuery().withSize(size)) map {result => result.hits.map(_.source)}

  def save(item: Event): Unit =
    esType.index(item) flatMap { _ => esIndex.refresh() }

  def search(query: Query, size: Int, start: Int): Future[SearchResult[Event]] =
    esType.search[Event](query.withSize(size).withFrom(start))

}
