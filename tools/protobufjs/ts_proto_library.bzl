def _run_pbjs(actions, executable, proto_file, es6):
  suffix = ".js"
  wrap = "amd"
  if es6:
    suffix = ".closure.js"
    wrap = "es6"

  proto_name = proto_file.basename[:-len(".proto")]
  js_tmpl_file = actions.declare_file(proto_name + suffix + ".tmpl")
  js_file = actions.declare_file(proto_name + suffix)
  args = actions.args()
  args.add(["-t", "static-module"])
  args.add(["-w", wrap])
  args.add(["-o", js_file.path + ".tmpl"])
  args.add(proto_file.path)
  actions.run(
      executable = executable._pbjs,
      inputs = [proto_file],
      outputs = [js_tmpl_file],
      arguments = [args],
  )
  
  actions.expand_template(
      template = js_tmpl_file, 
      output = js_file, 
      substitutions = {
          "define(": "define('" + proto_name + "', "
      }
  )
  return js_file

def _run_pbts(actions, executable, js_file):
  ts_file = actions.declare_file(js_file.basename[:-len(".closure.js")] + ".d.ts")
  args = actions.args()
  args.add(["-o", ts_file.path])
  args.add(js_file.path)
  actions.run(
      executable = executable._pbts,
      inputs = [js_file],
      outputs = [ts_file],
      arguments = [args],
  )
  return ts_file

def _ts_proto_library(ctx):
  #'pbjs -t static-module -w commonjs -o car.js car.proto'
  #'pbts -o car.d.ts car.js'

  js_es5 = _run_pbjs(ctx.actions, ctx.executable, ctx.files.srcs[0], es6 = False)
  js_es6 = _run_pbjs(ctx.actions, ctx.executable, ctx.files.srcs[0], es6 = True)
  dts = _run_pbts(ctx.actions, ctx.executable, js_es6)
  return struct(
    files=depset([js_es5, js_es6, dts]),
    typescript = struct(
      declarations = [dts],
      transitive_declarations = [dts],
      type_blacklisted_declarations = [],
      es5_sources = depset([js_es5]),
      es6_sources = depset([js_es6]),
      transitive_es5_sources = depset(),
      transitive_es6_sources = depset(),
      )
    
  )

ts_proto_library = rule(
    implementation = _ts_proto_library,
    attrs = {
        "srcs": attr.label_list(allow_files=True, doc=""""""),
        "_pbjs": attr.label(default = Label("//tools/protobufjs:pbjs"),
            executable = True, cfg = "host"),
        "_pbts": attr.label(default = Label("//tools/protobufjs:pbts"),
            executable = True, cfg = "host"),
    },
)
