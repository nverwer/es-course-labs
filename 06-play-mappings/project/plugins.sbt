// Comment to get more information during initialization
logLevel := Level.Warn

// The Typesafe repository 
resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

// Use the Play sbt plugin for Play projects
addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.2.2")

resolvers += Resolver.url("Rhinofly Internal Release Repository", new URL("http://maven-repository.rhinofly.net:8081/artifactory/libs-release-local"))(Resolver.ivyStylePatterns)
