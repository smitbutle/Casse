package middleware

import (
	"context"
	// "encoding/base64"
	// "errors"
	// "fmt"
	// "strings"

	"github.com/go-kit/kit/endpoint"
	// "github.com/nightsilvertech/clockwerk/gvar"
	// "golang.org/x/crypto/bcrypt"
	// "google.golang.org/grpc/metadata"
)

func BasicAuthMiddleware() endpoint.Middleware {
	return func(next endpoint.Endpoint) endpoint.Endpoint {
		return func(ctx context.Context, request interface{}) (interface{}, error) {
			// md, ok := metadata.FromIncomingContext(ctx)
			// if !ok {
			// 	return nil, errors.New("authentication required")
			// }
			// authData, ok := md["authorization"]
			// if !ok {
			// 	return nil, errors.New("authentication required")
			// }
			// var username, password string
			// var basicAuth, data []string
			// if basicAuth = strings.Split(authData[0], " "); len(basicAuth) != 2 {
			// 	return nil, errors.New("authentication required")
			// }
			// if data = strings.Split(basicAuth[1], ":"); len(basicAuth) != 2 {
			// 	return nil, errors.New("authentication required")
			// }
			// decoded, err := base64.StdEncoding.DecodeString(data[0])
			// if err != nil {
			// 	username = data[0]
			// 	password = data[1]
			// } else {
			// 	decodedDataSplit := strings.Split(string(decoded), ":")
			// 	username = decodedDataSplit[0]
			// 	password = decodedDataSplit[1]
			// }

			// key := fmt.Sprintf("%s_%s", gvar.HashKeyMap, username)
			// hashedPassword, ok := gvar.SyncMapHashStorage.Load(key)
			// if !ok {
			// 	return nil, errors.New("username not found")
			// }
			// err = bcrypt.CompareHashAndPassword([]byte(hashedPassword.(string)), []byte(password))
			// if err != nil {
			// 	return nil, err
			// }
			return next(ctx, request)
		}
	}
}
