package com.sqli.workshop.ddd.connaissance.client.generated.event.producer;


import com.sqli.workshop.ddd.connaissance.client.generated.event.model.*;


/**
 * 
 */
@jakarta.annotation.Generated(value = "io.zenwave360.sdk.plugins.SpringCloudStreams3Plugin", date = "2026-04-22T13:44:10.898217416+02:00")
public interface IDefaultServiceEventsProducer {


    
    /**
     * 
     */
    boolean sendAdresseMessage(AdresseMessagePayload payload, AdresseMessagePayloadHeaders headers);
    default boolean sendAdresseMessage(AdresseMessagePayload payload) {
        return sendAdresseMessage(payload, null);
    };
    



    static class AdresseMessagePayloadHeaders extends java.util.HashMap<String, Object> {
        public AdresseMessagePayloadHeaders set(String header, Object value) {
            put(header, value);
            return this;
        }
    }


}
