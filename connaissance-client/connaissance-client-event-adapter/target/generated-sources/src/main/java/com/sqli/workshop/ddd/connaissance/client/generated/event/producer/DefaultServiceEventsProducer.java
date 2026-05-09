package com.sqli.workshop.ddd.connaissance.client.generated.event.producer;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;


import com.sqli.workshop.ddd.connaissance.client.generated.event.model.*;


/**
 * 
 */
@Component
@jakarta.annotation.Generated(value = "io.zenwave360.sdk.plugins.SpringCloudStreams3Plugin", date = "2026-04-22T13:44:10.918187084+02:00")
public class DefaultServiceEventsProducer implements IDefaultServiceEventsProducer {

    protected Logger log = LoggerFactory.getLogger(getClass());

    protected StreamBridge streamBridge;
    public String sendAdresseMessageBindingName = "send-adresse-message-out-0";

    public java.util.function.Supplier<String> tracingIdSupplier;

    @org.springframework.beans.factory.annotation.Autowired(required = false)
    @org.springframework.beans.factory.annotation.Qualifier("tracingIdSupplier")
    public void setTracingIdSupplier(java.util.function.Supplier<String> tracingIdSupplier) {
        this.tracingIdSupplier = tracingIdSupplier;
    }


    public DefaultServiceEventsProducer(StreamBridge streamBridge) {
        this.streamBridge = streamBridge;
    }
    
    /**
     * 
     */
    public boolean sendAdresseMessage(AdresseMessagePayload payload, AdresseMessagePayloadHeaders headers) {
        log.debug("Sending message to topic: {}", sendAdresseMessageBindingName);
        Message message = MessageBuilder.createMessage(payload, new MessageHeaders(headers));
        return streamBridge.send(sendAdresseMessageBindingName, message);
    }

    





}
