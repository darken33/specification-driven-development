# CodesPostauxApi

All URIs are relative to *https://apicarto.ign.fr/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**codesPostauxCommunesCodePostalGet**](CodesPostauxApi.md#codesPostauxCommunesCodePostalGet) | **GET** /codes-postaux/communes/{codePostal} |  |



## codesPostauxCommunesCodePostalGet

> List&lt;Commune&gt; codesPostauxCommunesCodePostalGet(codePostal)



Renvoie les communes correspondant à un code postal

### Example

```java
// Import classes:
import com.sqli.workshop.ddd.connaissance.client.generated.codepostal.ApiClient;
import com.sqli.workshop.ddd.connaissance.client.generated.codepostal.ApiException;
import com.sqli.workshop.ddd.connaissance.client.generated.codepostal.Configuration;
import com.sqli.workshop.ddd.connaissance.client.generated.codepostal.models.*;
import com.sqli.workshop.ddd.connaissance.client.generated.codepostal.client.CodesPostauxApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://apicarto.ign.fr/api");

        CodesPostauxApi apiInstance = new CodesPostauxApi(defaultClient);
        String codePostal = "codePostal_example"; // String | Code postal de la commune.
        try {
            List<Commune> result = apiInstance.codesPostauxCommunesCodePostalGet(codePostal);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling CodesPostauxApi#codesPostauxCommunesCodePostalGet");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **codePostal** | **String**| Code postal de la commune. | |

### Return type

[**List&lt;Commune&gt;**](Commune.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success |  -  |

