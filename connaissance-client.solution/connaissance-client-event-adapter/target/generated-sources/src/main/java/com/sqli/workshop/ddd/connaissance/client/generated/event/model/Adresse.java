
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
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "destinataire",
    "ligne1",
    "ligne2",
    "codePostal",
    "ville"
})
public class Adresse implements Serializable
{

    @JsonProperty("destinataire")
    @Pattern(regexp = "^[a-zA-Z ,.'-]+$")
    @Size(min = 2, max = 50)
    private String destinataire;
    @JsonProperty("ligne1")
    @Pattern(regexp = "^[a-zA-Z0-9 ,.'-]+$")
    @Size(min = 2, max = 50)
    private String ligne1;
    @JsonProperty("ligne2")
    @Pattern(regexp = "^[a-zA-Z0-9 ,.'-]+$")
    @Size(min = 2, max = 50)
    private String ligne2;
    @JsonProperty("codePostal")
    @Pattern(regexp = "^[A-Z0-9]+$")
    @Size(min = 5, max = 5)
    private String codePostal;
    @JsonProperty("ville")
    @Pattern(regexp = "^[a-zA-Z ,.'-]+$")
    @Size(min = 2, max = 50)
    private String ville;
    @JsonIgnore
    @Valid
    private Map<String, Object> additionalProperties = new LinkedHashMap<String, Object>();
    protected final static Object NOT_FOUND_VALUE = new Object();
    private final static long serialVersionUID = -1156220827759122475L;

    @JsonProperty("destinataire")
    public String getDestinataire() {
        return destinataire;
    }

    @JsonProperty("destinataire")
    public void setDestinataire(String destinataire) {
        this.destinataire = destinataire;
    }

    public Adresse withDestinataire(String destinataire) {
        this.destinataire = destinataire;
        return this;
    }

    @JsonProperty("ligne1")
    public String getLigne1() {
        return ligne1;
    }

    @JsonProperty("ligne1")
    public void setLigne1(String ligne1) {
        this.ligne1 = ligne1;
    }

    public Adresse withLigne1(String ligne1) {
        this.ligne1 = ligne1;
        return this;
    }

    @JsonProperty("ligne2")
    public String getLigne2() {
        return ligne2;
    }

    @JsonProperty("ligne2")
    public void setLigne2(String ligne2) {
        this.ligne2 = ligne2;
    }

    public Adresse withLigne2(String ligne2) {
        this.ligne2 = ligne2;
        return this;
    }

    @JsonProperty("codePostal")
    public String getCodePostal() {
        return codePostal;
    }

    @JsonProperty("codePostal")
    public void setCodePostal(String codePostal) {
        this.codePostal = codePostal;
    }

    public Adresse withCodePostal(String codePostal) {
        this.codePostal = codePostal;
        return this;
    }

    @JsonProperty("ville")
    public String getVille() {
        return ville;
    }

    @JsonProperty("ville")
    public void setVille(String ville) {
        this.ville = ville;
    }

    public Adresse withVille(String ville) {
        this.ville = ville;
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

    public Adresse withAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
        return this;
    }

    protected boolean declaredProperty(String name, Object value) {
        if ("destinataire".equals(name)) {
            if (value instanceof String) {
                setDestinataire(((String) value));
            } else {
                throw new IllegalArgumentException(("property \"destinataire\" is of type \"java.lang.String\", but got "+ value.getClass().toString()));
            }
            return true;
        } else {
            if ("ligne1".equals(name)) {
                if (value instanceof String) {
                    setLigne1(((String) value));
                } else {
                    throw new IllegalArgumentException(("property \"ligne1\" is of type \"java.lang.String\", but got "+ value.getClass().toString()));
                }
                return true;
            } else {
                if ("ligne2".equals(name)) {
                    if (value instanceof String) {
                        setLigne2(((String) value));
                    } else {
                        throw new IllegalArgumentException(("property \"ligne2\" is of type \"java.lang.String\", but got "+ value.getClass().toString()));
                    }
                    return true;
                } else {
                    if ("codePostal".equals(name)) {
                        if (value instanceof String) {
                            setCodePostal(((String) value));
                        } else {
                            throw new IllegalArgumentException(("property \"codePostal\" is of type \"java.lang.String\", but got "+ value.getClass().toString()));
                        }
                        return true;
                    } else {
                        if ("ville".equals(name)) {
                            if (value instanceof String) {
                                setVille(((String) value));
                            } else {
                                throw new IllegalArgumentException(("property \"ville\" is of type \"java.lang.String\", but got "+ value.getClass().toString()));
                            }
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        }
    }

    protected Object declaredPropertyOrNotFound(String name, Object notFoundValue) {
        if ("destinataire".equals(name)) {
            return getDestinataire();
        } else {
            if ("ligne1".equals(name)) {
                return getLigne1();
            } else {
                if ("ligne2".equals(name)) {
                    return getLigne2();
                } else {
                    if ("codePostal".equals(name)) {
                        return getCodePostal();
                    } else {
                        if ("ville".equals(name)) {
                            return getVille();
                        } else {
                            return notFoundValue;
                        }
                    }
                }
            }
        }
    }

    @SuppressWarnings({
        "unchecked"
    })
    public<T >T get(String name) {
        Object value = declaredPropertyOrNotFound(name, Adresse.NOT_FOUND_VALUE);
        if (Adresse.NOT_FOUND_VALUE!= value) {
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

    public Adresse with(String name, Object value) {
        if (!declaredProperty(name, value)) {
            getAdditionalProperties().put(name, ((Object) value));
        }
        return this;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Adresse.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("destinataire");
        sb.append('=');
        sb.append(((this.destinataire == null)?"<null>":this.destinataire));
        sb.append(',');
        sb.append("ligne1");
        sb.append('=');
        sb.append(((this.ligne1 == null)?"<null>":this.ligne1));
        sb.append(',');
        sb.append("ligne2");
        sb.append('=');
        sb.append(((this.ligne2 == null)?"<null>":this.ligne2));
        sb.append(',');
        sb.append("codePostal");
        sb.append('=');
        sb.append(((this.codePostal == null)?"<null>":this.codePostal));
        sb.append(',');
        sb.append("ville");
        sb.append('=');
        sb.append(((this.ville == null)?"<null>":this.ville));
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
        result = ((result* 31)+((this.ligne2 == null)? 0 :this.ligne2 .hashCode()));
        result = ((result* 31)+((this.ville == null)? 0 :this.ville.hashCode()));
        result = ((result* 31)+((this.ligne1 == null)? 0 :this.ligne1 .hashCode()));
        result = ((result* 31)+((this.destinataire == null)? 0 :this.destinataire.hashCode()));
        result = ((result* 31)+((this.codePostal == null)? 0 :this.codePostal.hashCode()));
        result = ((result* 31)+((this.additionalProperties == null)? 0 :this.additionalProperties.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Adresse) == false) {
            return false;
        }
        Adresse rhs = ((Adresse) other);
        return (((((((this.ligne2 == rhs.ligne2)||((this.ligne2 != null)&&this.ligne2 .equals(rhs.ligne2)))&&((this.ville == rhs.ville)||((this.ville!= null)&&this.ville.equals(rhs.ville))))&&((this.ligne1 == rhs.ligne1)||((this.ligne1 != null)&&this.ligne1 .equals(rhs.ligne1))))&&((this.destinataire == rhs.destinataire)||((this.destinataire!= null)&&this.destinataire.equals(rhs.destinataire))))&&((this.codePostal == rhs.codePostal)||((this.codePostal!= null)&&this.codePostal.equals(rhs.codePostal))))&&((this.additionalProperties == rhs.additionalProperties)||((this.additionalProperties!= null)&&this.additionalProperties.equals(rhs.additionalProperties))));
    }

}
