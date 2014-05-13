package labs

import stores.EventStore

object EventSearcher extends App {
  val store = new EventStore("rock_festival")
  /*
   * Look for festivals that are within 200km of Utrecht.
   * Look for festivals that lie in a rectangle bounded by Vancouver (49.2569777,-123.123904) and Puerto Rico (18.4887494,-66.2970565).
   * Which festivals are on the northern and/or western hemisphere. Can you do this using a nested filter?
   */
}
