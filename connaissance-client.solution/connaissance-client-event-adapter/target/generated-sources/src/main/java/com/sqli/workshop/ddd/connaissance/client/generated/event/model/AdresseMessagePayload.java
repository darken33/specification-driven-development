
package com.sqli.workshop.ddd.connaissance.client.generated.event.model;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.Valid;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "clientId",
    "adresse"
})
public class AdresseMessagePayload implements Serializable
{

    @JsonProperty("clientId")
    private String clientId;
    @JsonProperty("adresse")
    @Valid
    private Adresse adresse;
    @JsonIgnore
    @Valid
    private Map<String, Object> additionalProperties = new LinkedHashMap<String, Object>();
    protected final static Object NOT_FOUND_VALUE = new Object();
    private final static long serialVersionUID = -4936448380365910836L;

    @JsonProperty("clientId")
    public String getClientId() {
        return clientId;
    }

    @JsonProperty("clientId")
    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public AdresseMessagePayload withClientId(String clientId) {
        this.clientId = clientId;
        return this;
    }

    @JsonProperty("adresse")
    public Adresse getAdresse() {
        return adresse;
    }

    @JsonProperty("adresse")
    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public AdresseMessagePayload withAdresse(Adresse adresse) {
        this.adresse = adresse;
        return this;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

    public AdresseMessagePayload withAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
        return this;
    }

    protected boolean declaredProperty(String name, Object value) {
        if ("clientId".equals(name)) {
            if (value instanceof String) {
                setClientId(((String) value));
            } else {
                throw new IllegalArgumentException(("property \"clientId\" is of type \"java.lang.String\", but got "+ value.getClass().toString()));
            }
            return true;
        } else {
            if ("adresse".equals(name)) {
                if (value instanceof Adresse) {
                    setAdresse(((Adresse) value));
                } else {
                    throw new IllegalArgumentException(("property \"adresse\" is of type \"com.sqli.workshop.ddd.connaissance.client.generated.event.model.Adresse\", but got "+ value.getClass().toString()));
                }
                return true;
            } else {
                return false;
            }
        }
    }

    protected Object declaredPropertyOrNotFound(String name, Object notFoundValue) {
        if ("clientId".equals(name)) {
            return getClientId();
        } else {
            if ("adresse".equals(name)) {
                return getAdresse();
            } else {
                return notFoundValue;
            }
        }
    }

    @SuppressWarnings({
        "unchecked"
    })
    public<T >T get(String name) {
        Object value = declaredPropertyOrNotFound(name, AdresseMessagePayload.NOT_FOUND_VALUE);
        if (AdresseMessagePayload.NOT_FOUND_VALUE!= value) {
            return ((T) value);
        } else {
            return ((T) getAdditionalProperties().get(name));
        }
    }

    public void set(String name, Object value) {
        if (!declaredProperty(name, value)) {
            getAdditionalProperties().put(name, ((Object) value));
        }
    }

    public AdresseMessagePayload with(String name, Object value) {
        if (!declaredProperty(name, value)) {
            getAdditionalProperties().put(name, ((Object) value));
        }
        return this;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(AdresseMessagePayload.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("clientId");
        sb.append('=');
        sb.append(((this.clientId == null)?"<null>":this.clientId));
        sb.append(',');
        sb.append("adresse");
        sb.append('=');
        sb.append(((this.adresse == null)?"<null>":this.adresse));
        sb.append(',');
        sb.append("additionalProperties");
        sb.append('=');
        sb.append(((this.additionalProperties == null)?"<null>":this.additionalProperties));
        sb.append(',');
        if (sb.charAt((sb.length()- 1)) == ',') {
            sb.setCharAt((sb.length()- 1), ']');
        } else {
            sb.append(']');
        }
        return sb.toString();
    }

    @Override
    public int hashCode() {
        int result = 1;
        result = ((result* 31)+((this.adresse == null)? 0 :this.adresse.hashCode()));
        result = ((result* 31)+((this.clientId == null)? 0 :this.clientId.hashCode()));
        result = ((result* 31)+((this.additionalProperties == null)? 0 :this.additionalProperties.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof AdresseMessagePayload) == false) {
            return false;
        }
        AdresseMessagePayload rhs = ((AdresseMessagePayload) other);
        return ((((this.adresse == rhs.adresse)||((this.adresse!= null)&&this.adresse.equals(rhs.adresse)))&&((this.clientId == rhs.clientId)||((this.clientId!= null)&&this.clientId.equals(rhs.clientId))))&&((this.additionalProperties == rhs.additionalProperties)||((this.additionalProperties!= null)&&this.additionalProperties.equals(rhs.additionalProperties))));
    }

}
