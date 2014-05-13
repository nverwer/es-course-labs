package models

import fly.play.elasticsearch.geo.GeoPointMapping
import fly.play.elasticsearch.mapping.{DateMapping, IndexType, Mapping, NumberMapping, NumberType, ObjectMapping, StringMapping}
import java.text.SimpleDateFormat
import java.util.Date
import play.api.libs.functional.syntax.{functionalCanBuildApplicative, toFunctionalBuilderOps, unlift}
import play.api.libs.json.{Format, __}
import util.LatLon

case class Event(
  name: String,
  date: Date,
  nrVisitors: Int,
  location: LatLon,
  description: String
)

object Event {

  private val yyyymmddFormat = new SimpleDateFormat("yyyy-MM-dd")

  def apply(name: String, date: String, nrVisitors: Int, location: LatLon, description: String): Event =
    new Event(name, yyyymmddFormat.parse(date), nrVisitors, location, description)

  implicit val format: Format[Event] = (
    (__ \ "name").format[String] and
    (__ \ "date").format[Date] and
    (__ \ "nrVisitors").format[Int] and
    (__ \ "location").format[LatLon] and
    (__ \ "description").format[String]
  )(Event.apply, unlift(Event.unapply))

  val esMapping: Mapping = ObjectMapping("event", properties = Set(
    StringMapping("name", index = IndexType.analyzed),
    DateMapping("date", index = IndexType.analyzed),
    NumberMapping("nrVisitors", numberType = NumberType.integer, index = IndexType.analyzed),
    GeoPointMapping("location", indexLatLon = true),
    StringMapping("description", index = IndexType.analyzed)
  ))

}
