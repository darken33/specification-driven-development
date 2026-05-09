package com.sqli.workshop.ddd.connaissance.client.generated.api.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sqli.workshop.ddd.connaissance.client.generated.api.model.SituationFamilialeDto;
import org.springframework.lang.Nullable;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * SituationDto
 */

@JsonTypeName("Situation")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.18.0")
public class SituationDto {

  private SituationFamilialeDto situationFamiliale;

  private Integer nombreEnfants;

  public SituationDto() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public SituationDto(SituationFamilialeDto situationFamiliale, Integer nombreEnfants) {
    this.situationFamiliale = situationFamiliale;
    this.nombreEnfants = nombreEnfants;
  }

  public SituationDto situationFamiliale(SituationFamilialeDto situationFamiliale) {
    this.situationFamiliale = situationFamiliale;
    return this;
  }

  /**
   * Get situationFamiliale
   * @return situationFamiliale
   */
  @NotNull @Valid 
  @Schema(name = "situationFamiliale", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("situationFamiliale")
  public SituationFamilialeDto getSituationFamiliale() {
    return situationFamiliale;
  }

  public void setSituationFamiliale(SituationFamilialeDto situationFamiliale) {
    this.situationFamiliale = situationFamiliale;
  }

  public SituationDto nombreEnfants(Integer nombreEnfants) {
    this.nombreEnfants = nombreEnfants;
    return this;
  }

  /**
   * Get nombreEnfants
   * minimum: 0
   * maximum: 20
   * @return nombreEnfants
   */
  @NotNull @Min(value = 0) @Max(value = 20) 
  @Schema(name = "nombreEnfants", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("nombreEnfants")
  public Integer getNombreEnfants() {
    return nombreEnfants;
  }

  public void setNombreEnfants(Integer nombreEnfants) {
    this.nombreEnfants = nombreEnfants;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SituationDto situation = (SituationDto) o;
    return Objects.equals(this.situationFamiliale, situation.situationFamiliale) &&
        Objects.equals(this.nombreEnfants, situation.nombreEnfants);
  }

  @Override
  public int hashCode() {
    return Objects.hash(situationFamiliale, nombreEnfants);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SituationDto {\n");
    sb.append("    situationFamiliale: ").append(toIndentedString(situationFamiliale)).append("\n");
    sb.append("    nombreEnfants: ").append(toIndentedString(nombreEnfants)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

