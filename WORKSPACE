workspace(name = "cars")

# proto_library, cc_proto_library, and java_proto_library rules implicitly
# depend on @com_google_protobuf for protoc and proto runtimes.
# This statement defines the @com_google_protobuf repo.
http_archive(
    name = "com_google_protobuf",
    sha256 = "cef7f1b5a7c5fba672bec2a319246e8feba471f04dcebfe362d55930ee7c1c30",
    strip_prefix = "protobuf-3.5.0",
    urls = ["https://github.com/google/protobuf/archive/v3.5.0.zip"],
)

# java_lite_proto_library rules implicitly depend on @com_google_protobuf_javalite//:javalite_toolchain,
# which is the JavaLite proto runtime (base classes and common utilities).
http_archive(
    name = "com_google_protobuf_javalite",
    sha256 = "d8a2fed3708781196f92e1e7e7e713cf66804bd2944894401057214aff4f468e",
    strip_prefix = "protobuf-5e8916e881c573c5d83980197a6f783c132d4276",
    urls = ["https://github.com/google/protobuf/archive/5e8916e881c573c5d83980197a6f783c132d4276.zip"],
)

maven_jar(
    name = "protobuf_java_format",
    artifact = "com.googlecode.protobuf-java-format:protobuf-java-format:1.4",
    sha1 = "b8163b6940102c1808814471476f5293dfb419df",
)

####################################
# The Bazel buildtools repo contains tools like the BUILD file formatter, buildifier
http_archive(
    name = "com_github_bazelbuild_buildtools",
    sha256 = "4d8d6244320dd751590f9100cf39fd7a4b75cd901e1f3ffdfd6f048328883695",
    # Note, this commit matches the version of buildifier in angular/ngcontainer
    url = "https://github.com/bazelbuild/buildtools/archive/b3b620e8bcff18ed3378cd3f35ebeb7016d71f71.zip",
)

####################################
# Fetch and install the NodeJS rules
http_archive(
    name = "build_bazel_rules_nodejs",
    url = "https://github.com/bazelbuild/rules_nodejs/archive/0.7.0.zip",
    strip_prefix = "rules_nodejs-0.7.0",
    sha256 = "d0cecf6b149d431ee8349f683d1db6a2a881ee81d8066a66c1b112a4b02748de",
)

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories", "yarn_install")

node_repositories(package_json = ["//:package.json"])

yarn_install(
    name = "protobufs_compiletime_deps",
    package_json = "//tools/protobufjs:package.json",
    yarn_lock = "//tools/protobufjs:yarn.lock",
)

####################################
# Fetch and install the Sass rules
git_repository(
    name = "io_bazel_rules_sass",
    remote = "https://github.com/bazelbuild/rules_sass.git",
    tag = "0.0.3",
)

load("@io_bazel_rules_sass//sass:sass.bzl", "sass_repositories")

sass_repositories()

####################################
# Fetch and install the TypeScript rules
http_archive(
    name = "build_bazel_rules_typescript",
    sha256 = "a2c81776a4a492ff9f878f9705639f5647bef345f7f3e1da09c9eeb8dec80485",
    strip_prefix = "rules_typescript-0.10.1",
    url = "https://github.com/bazelbuild/rules_typescript/archive/0.10.1.zip",
)

load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")

ts_setup_workspace()

# Some of the TypeScript is written in Go.
# Bazel doesn't support transitive WORKSPACE deps, so we must repeat them here.
http_archive(
    name = "io_bazel_rules_go",
    sha256 = "4b14d8dd31c6dbaf3ff871adcd03f28c3274e42abc855cb8fb4d01233c0154dc",
    url = "https://github.com/bazelbuild/rules_go/releases/download/0.10.1/rules_go-0.10.1.tar.gz",
)

load("@io_bazel_rules_go//go:def.bzl", "go_rules_dependencies", "go_register_toolchains")

go_rules_dependencies()

go_register_toolchains()

####################################
# Tell Bazel about some workspaces that were installed from npm.
local_repository(
    name = "angular",
    path = "node_modules/@angular/bazel",
)

local_repository(
    name = "rxjs",
    path = "node_modules/rxjs/src",
)

####################################
http_archive(
    name = "io_bazel_rules_appengine",
    sha256 = "d1fbc9a48332cc00b56d66751b5eb911ac9a88e820af7a2316a9b5ed4ee46d0b",
    strip_prefix = "rules_appengine-0.0.7",
    url = "https://github.com/bazelbuild/rules_appengine/archive/0.0.7.tar.gz",
)

load("@io_bazel_rules_appengine//appengine:appengine.bzl", "appengine_repositories")

appengine_repositories()
