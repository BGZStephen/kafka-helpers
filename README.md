# kafka-helpers

## Resetting offsets

In order to reset a kafka consumer, first ensure the consumer is closed down, otherwise you'll receive an error.

- Create a properties file called something like `kafka.properties` with the following:

```
ssl.keystore.location= // location to the p12 file
ssl.keystore.password=
ssl.keystore.type=PKCS12
ssl.truststore.location= // location to the jks file
ssl.truststore.password=
ssl.truststore.type=JKS
ssl.protocol=TLS
```
- Ensure confluent is installed to give access to the kafka tooling: https://www.confluent.io/previous-versions/
- run the following to perform a dry run: 
```
kafka-consumer-groups --command-config $PROPERTIES_FILE_NAME \
                      --bootstrap-server $KAFKA_BOOTSTRAP_SERVERS \
                      --group $CONSUMER_GROUP_NAME \
                      --topic $TOPIC \
                      --reset-offsets \
                      --to-earliest \
                      --dry-run
```
- run the following to perform a reset: 
```
kafka-consumer-groups --command-config $PROPERTIES_FILE_NAME \
                      --bootstrap-server $KAFKA_BOOTSTRAP_SERVERS \
                      --group $CONSUMER_GROUP_NAME \
                      --topic $TOPIC \
                      --reset-offsets \
                      --to-earliest \
                      --execute
```
