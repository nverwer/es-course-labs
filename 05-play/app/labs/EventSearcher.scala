package labs

import stores.EventStore

object EventSearcher extends App {
  val store = new EventStore("rock_festival")
  /*
   * Look for festivals that do not have "festival" in their name.
   * ... that do not have "festival" in their name or description.
   * Which ones refer to Woodstock in their description?
   * Find festivals later than 1970, with more than 100000 visitors.
   * Give festivals between 1970 and 1980 a 'boost'.
   * Find out how you can sort the results by number of visitors.
   */
}
