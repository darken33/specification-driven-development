package com.sqli.workshop.ddd.connaissance.client.generated.api.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.time.OffsetDateTime;
import org.springframework.format.annotation.DateTimeFormat;
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
 * ApiErrorResponseDto
 */

@JsonTypeName("ApiErrorResponse")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.18.0")
public class ApiErrorResponseDto {

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private @Nullable OffsetDateTime timestamp;

  private @Nullable Integer status;

  private @Nullable String error;

  private @Nullable String message;

  private @Nullable String path;

  public ApiErrorResponseDto timestamp(@Nullable OffsetDateTime timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * Get timestamp
   * @return timestamp
   */
  @Valid 
  @Schema(name = "timestamp", example = "2017-07-21T17:32:28.437Z", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("timestamp")
  public @Nullable OffsetDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(@Nullable OffsetDateTime timestamp) {
    this.timestamp = timestamp;
  }

  public ApiErrorResponseDto status(@Nullable Integer status) {
    this.status = status;
    return this;
  }

  /**
   * Get status
   * @return status
   */
  
  @Schema(name = "status", example = "400", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("status")
  public @Nullable Integer getStatus() {
    return status;
  }

  public void setStatus(@Nullable Integer status) {
    this.status = status;
  }

  public ApiErrorResponseDto error(@Nullable String error) {
    this.error = error;
    return this;
  }

  /**
   * Get error
   * @return error
   */
  
  @Schema(name = "error", example = "Bad Request", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("error")
  public @Nullable String getError() {
    return error;
  }

  public void setError(@Nullable String error) {
    this.error = error;
  }

  public ApiErrorResponseDto message(@Nullable String message) {
    this.message = message;
    return this;
  }

  /**
   * Get message
   * @return message
   */
  
  @Schema(name = "message", example = "Validation failed for object='connaissanceClientInDto'. Error count: 1", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("message")
  public @Nullable String getMessage() {
    return message;
  }

  public void setMessage(@Nullable String message) {
    this.message = message;
  }

  public ApiErrorResponseDto path(@Nullable String path) {
    this.path = path;
    return this;
  }

  /**
   * Get path
   * @return path
   */
  
  @Schema(name = "path", example = "/connaissance-clients", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("path")
  public @Nullable String getPath() {
    return path;
  }

  public void setPath(@Nullable String path) {
    this.path = path;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ApiErrorResponseDto apiErrorResponse = (ApiErrorResponseDto) o;
    return Objects.equals(this.timestamp, apiErrorResponse.timestamp) &&
        Objects.equals(this.status, apiErrorResponse.status) &&
        Objects.equals(this.error, apiErrorResponse.error) &&
        Objects.equals(this.message, apiErrorResponse.message) &&
        Objects.equals(this.path, apiErrorResponse.path);
  }

  @Override
  public int hashCode() {
    return Objects.hash(timestamp, status, error, message, path);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ApiErrorResponseDto {\n");
    sb.append("    timestamp: ").append(toIndentedString(timestamp)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    error: ").append(toIndentedString(error)).append("\n");
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb.append("    path: ").append(toIndentedString(path)).append("\n");
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

