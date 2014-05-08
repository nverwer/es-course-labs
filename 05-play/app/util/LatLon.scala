package util

import play.api.libs.json.Json
import scala.math._

/**
 * Latitude and longitude in degrees.
 * See [http://en.wikipedia.org/wiki/ISO_6709].
 */
case class LatLon(lat: Double, lon: Double) {

  /**
   * Compute the distance to another LatLong in km, using the *spherical law of Cosines*.
   * See [http://www.movable-type.co.uk/scripts/latlong.html].
   */
  def distanceTo(that: LatLon): Double =
    acos(
      sin(toRadians(this.lat)) * sin(toRadians(that.lat)) +
        cos(toRadians(this.lat)) * cos(toRadians(that.lat)) * cos(toRadians(that.lon - this.lon))) * LatLon.R;
}

object LatLon {

  private val R = 6371; // Radius of planet Earth in km.

  implicit val latLonFormat = Json.format[LatLon]

}
