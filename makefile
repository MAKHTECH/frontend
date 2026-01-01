
generate:
	protoc -I=proto ^proto/sso/auth.proto proto/sso/user.proto proto/sso/sso.proto ^--plugin=protoc-gen-js=node_modules\.bin\protoc-gen-js.cmd ^--js_out=import_style=commonjs:src/generated ^--plugin=protoc-gen-grpc-web=node_modules\.bin\protoc-gen-grpc-web.cmd ^--grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/generated