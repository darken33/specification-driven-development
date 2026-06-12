package com.sqli.workshop.ddd.connaissance.client.generated.event.producer;

@jakarta.annotation.Generated(value = "io.zenwave360.sdk.plugins.SpringCloudStreams3Plugin", date = "2026-04-22T13:44:10.931750064+02:00")
public class ProducerInMemoryContext {

    public static final ProducerInMemoryContext INSTANCE = new ProducerInMemoryContext();


    private DefaultServiceEventsProducerCaptor defaultServiceEventsProducerCaptor = new DefaultServiceEventsProducerCaptor();

    public <T extends IDefaultServiceEventsProducer> T defaultServiceEventsProducer() {
        return (T) defaultServiceEventsProducerCaptor;
    }

}
