import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

  val appName = "play-elasticsearch-labs-1"
  val appVersion = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    "nl.rhinofly" %% "play-elasticsearch-client" % "0.13"
  )

  val main = play.Project(appName, appVersion, appDependencies)
    .settings(
      scalacOptions ++= Seq("-feature", "-deprecation", "-unchecked"),
      resolvers ++= Seq(
        "Rhinofly Libs Snapshot Repository" at "http://maven-repository.rhinofly.net:8081/artifactory/libs-snapshot-local",
        "Rhinofly Libs Repository" at "http://maven-repository.rhinofly.net:8081/artifactory/libs-release-local",
        "Rhinofly Ext Releases Repository" at "http://maven-repository.rhinofly.net:8081/artifactory/ext-release-local")
    )

}
