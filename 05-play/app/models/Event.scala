package models

import java.util.Date
import util.LatLon
import play.api.libs.json._
import play.api.libs.functional.syntax._
import java.text.DateFormat
import java.text.SimpleDateFormat

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

}
