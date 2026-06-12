package com.sqli.workshop.ddd.connaissance.client.generated.event.producer;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.support.MessageBuilder;


import com.sqli.workshop.ddd.connaissance.client.generated.event.model.*;


/**
 * 
 */
@jakarta.annotation.Generated(value = "io.zenwave360.sdk.plugins.SpringCloudStreams3Plugin", date = "2026-04-22T13:44:10.926388065+02:00")
public class DefaultServiceEventsProducerCaptor implements IDefaultServiceEventsProducer {

    protected Logger log = LoggerFactory.getLogger(getClass());
    public String sendAdresseMessageBindingName = "send-adresse-message-out-0";

    public java.util.function.Supplier<String> tracingIdSupplier;

    @org.springframework.beans.factory.annotation.Autowired(required = false)
    @org.springframework.beans.factory.annotation.Qualifier("tracingIdSupplier")
    public void setTracingIdSupplier(java.util.function.Supplier<String> tracingIdSupplier) {
        this.tracingIdSupplier = tracingIdSupplier;
    }


    protected Map<String, List<Message>> capturedMessages = new HashMap<>();
    public Map<String, List<Message>> getCapturedMessages() {
        return capturedMessages;
    }
    public List<Message> getCapturedMessages(String bindingName) {
        return capturedMessages.getOrDefault(bindingName, new ArrayList<>());
    }
    private boolean appendCapturedMessage(String bindingName, Message message) {
        if(capturedMessages.containsKey(bindingName)) {
            capturedMessages.get(bindingName).add(message);
        } else {
            capturedMessages.put(bindingName, new ArrayList<>(List.of(message)));
        }
        return true;
    }
    
    /**
     * 
     */
    public boolean sendAdresseMessage(AdresseMessagePayload payload, AdresseMessagePayloadHeaders headers) {
        log.debug("Capturing message to topic: {}", sendAdresseMessageBindingName);
        Message message = MessageBuilder.createMessage(payload, new MessageHeaders(headers));
        return appendCapturedMessage(sendAdresseMessageBindingName, message);
    }

    


}
