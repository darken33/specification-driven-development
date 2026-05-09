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
 * ConnaissanceClientInDto
 */

@JsonTypeName("ConnaissanceClientIn")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.18.0")
public class ConnaissanceClientInDto {

  private String nom;

  private String prenom;

  private String ligne1;

  private @Nullable String ligne2;

  private String codePostal;

  private String ville;

  private SituationFamilialeDto situationFamiliale;

  private Integer nombreEnfants;

  public ConnaissanceClientInDto() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public ConnaissanceClientInDto(String nom, String prenom, String ligne1, String codePostal, String ville, SituationFamilialeDto situationFamiliale, Integer nombreEnfants) {
    this.nom = nom;
    this.prenom = prenom;
    this.ligne1 = ligne1;
    this.codePostal = codePostal;
    this.ville = ville;
    this.situationFamiliale = situationFamiliale;
    this.nombreEnfants = nombreEnfants;
  }

  public ConnaissanceClientInDto nom(String nom) {
    this.nom = nom;
    return this;
  }

  /**
   * Get nom
   * @return nom
   */
  @NotNull @Pattern(regexp = "^[a-zA-Z ,.'-]+$") @Size(min = 2, max = 50) 
  @Schema(name = "nom", example = "Philippe", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("nom")
  public String getNom() {
    return nom;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }

  public ConnaissanceClientInDto prenom(String prenom) {
    this.prenom = prenom;
    return this;
  }

  /**
   * Get prenom
   * @return prenom
   */
  @NotNull @Pattern(regexp = "^[a-zA-Z ,.'-]+$") @Size(min = 2, max = 50) 
  @Schema(name = "prenom", example = "Philippe", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("prenom")
  public String getPrenom() {
    return prenom;
  }

  public void setPrenom(String prenom) {
    this.prenom = prenom;
  }

  public ConnaissanceClientInDto ligne1(String ligne1) {
    this.ligne1 = ligne1;
    return this;
  }

  /**
   * Get ligne1
   * @return ligne1
   */
  @NotNull @Pattern(regexp = "^[a-zA-Z0-9 ,.'-]+$") @Size(min = 2, max = 50) 
  @Schema(name = "ligne1", example = "48 rue bauducheu", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("ligne1")
  public String getLigne1() {
    return ligne1;
  }

  public void setLigne1(String ligne1) {
    this.ligne1 = ligne1;
  }

  public ConnaissanceClientInDto ligne2(@Nullable String ligne2) {
    this.ligne2 = ligne2;
    return this;
  }

  /**
   * Get ligne2
   * @return ligne2
   */
  @Pattern(regexp = "^[a-zA-Z0-9 ,.'-]+$") @Size(min = 2, max = 50) 
  @Schema(name = "ligne2", example = "48 rue bauducheu", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("ligne2")
  public @Nullable String getLigne2() {
    return ligne2;
  }

  public void setLigne2(@Nullable String ligne2) {
    this.ligne2 = ligne2;
  }

  public ConnaissanceClientInDto codePostal(String codePostal) {
    this.codePostal = codePostal;
    return this;
  }

  /**
   * Get codePostal
   * @return codePostal
   */
  @NotNull @Pattern(regexp = "^[A-Z0-9]+$") @Size(min = 5, max = 5) 
  @Schema(name = "codePostal", example = "33800", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("codePostal")
  public String getCodePostal() {
    return codePostal;
  }

  public void setCodePostal(String codePostal) {
    this.codePostal = codePostal;
  }

  public ConnaissanceClientInDto ville(String ville) {
    this.ville = ville;
    return this;
  }

  /**
   * Get ville
   * @return ville
   */
  @NotNull @Pattern(regexp = "^[a-zA-Z ,.'-]+$") @Size(min = 2, max = 50) 
  @Schema(name = "ville", example = "Philippe", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("ville")
  public String getVille() {
    return ville;
  }

  public void setVille(String ville) {
    this.ville = ville;
  }

  public ConnaissanceClientInDto situationFamiliale(SituationFamilialeDto situationFamiliale) {
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

  public ConnaissanceClientInDto nombreEnfants(Integer nombreEnfants) {
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
    ConnaissanceClientInDto connaissanceClientIn = (ConnaissanceClientInDto) o;
    return Objects.equals(this.nom, connaissanceClientIn.nom) &&
        Objects.equals(this.prenom, connaissanceClientIn.prenom) &&
        Objects.equals(this.ligne1, connaissanceClientIn.ligne1) &&
        Objects.equals(this.ligne2, connaissanceClientIn.ligne2) &&
        Objects.equals(this.codePostal, connaissanceClientIn.codePostal) &&
        Objects.equals(this.ville, connaissanceClientIn.ville) &&
        Objects.equals(this.situationFamiliale, connaissanceClientIn.situationFamiliale) &&
        Objects.equals(this.nombreEnfants, connaissanceClientIn.nombreEnfants);
  }

  @Override
  public int hashCode() {
    return Objects.hash(nom, prenom, ligne1, ligne2, codePostal, ville, situationFamiliale, nombreEnfants);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ConnaissanceClientInDto {\n");
    sb.append("    nom: ").append(toIndentedString(nom)).append("\n");
    sb.append("    prenom: ").append(toIndentedString(prenom)).append("\n");
    sb.append("    ligne1: ").append(toIndentedString(ligne1)).append("\n");
    sb.append("    ligne2: ").append(toIndentedString(ligne2)).append("\n");
    sb.append("    codePostal: ").append(toIndentedString(codePostal)).append("\n");
    sb.append("    ville: ").append(toIndentedString(ville)).append("\n");
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

