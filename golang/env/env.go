package env

import (
	"log"

	"github.com/spf13/viper"
)

func ReadConfigFile() {
	viper.SetConfigFile(".env")

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			log.Fatalln(err)
		} else {
			log.Fatalln(err)
		}
	}
}

func GetKey(key string) string {
	return viper.Get(key).(string)
}
