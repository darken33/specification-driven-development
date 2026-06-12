package com.sqli.workshop.ddd.connaissance.client.db;

import com.sqli.workshop.ddd.connaissance.client.domain.models.Client;
import com.sqli.workshop.ddd.connaissance.client.domain.models.types.Adresse;
import com.sqli.workshop.ddd.connaissance.client.domain.models.types.CodePostal;
import com.sqli.workshop.ddd.connaissance.client.domain.models.types.LigneAdresse;
import com.sqli.workshop.ddd.connaissance.client.domain.models.types.Nom;
import com.sqli.workshop.ddd.connaissance.client.domain.models.types.Prenom;
import com.sqli.workshop.ddd.connaissance.client.domain.models.types.Ville;
import java.util.Optional;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-22T13:43:56+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class ClientDbMapperImpl implements ClientDbMapper {

    @Override
    public ClientDb mapFromDomain(Client cclient) {

        ClientDb clientDb = new ClientDb();

        if ( cclient != null ) {
            clientDb.setNom( cclientNomValue( cclient ) );
            clientDb.setPrenom( cclientPrenomValue( cclient ) );
            clientDb.setId( map( cclient.getId() ) );
            clientDb.setLigne1( cclientAdresseLigne1Value( cclient ) );
            clientDb.setLigne2( map( cclientAdresseLigne2( cclient ) ) );
            clientDb.setCodePostal( cclientAdresseCodePostalValue( cclient ) );
            clientDb.setVille( cclientAdresseVilleValue( cclient ) );
            clientDb.setSituationFamiliale( mapSituationFamiliale( cclient.getSituationFamiliale() ) );
            clientDb.setNombreEnfants( cclient.getNombreEnfants() );
        }

        return clientDb;
    }

    private String cclientNomValue(Client client) {
        Nom nom = client.getNom();
        if ( nom == null ) {
            return null;
        }
        return nom.value();
    }

    private String cclientPrenomValue(Client client) {
        Prenom prenom = client.getPrenom();
        if ( prenom == null ) {
            return null;
        }
        return prenom.value();
    }

    private String cclientAdresseLigne1Value(Client client) {
        Adresse adresse = client.getAdresse();
        if ( adresse == null ) {
            return null;
        }
        LigneAdresse ligne1 = adresse.ligne1();
        if ( ligne1 == null ) {
            return null;
        }
        return ligne1.value();
    }

    private Optional<LigneAdresse> cclientAdresseLigne2(Client client) {
        Adresse adresse = client.getAdresse();
        if ( adresse == null ) {
            return null;
        }
        return adresse.ligne2();
    }

    private String cclientAdresseCodePostalValue(Client client) {
        Adresse adresse = client.getAdresse();
        if ( adresse == null ) {
            return null;
        }
        CodePostal codePostal = adresse.codePostal();
        if ( codePostal == null ) {
            return null;
        }
        return codePostal.value();
    }

    private String cclientAdresseVilleValue(Client client) {
        Adresse adresse = client.getAdresse();
        if ( adresse == null ) {
            return null;
        }
        Ville ville = adresse.ville();
        if ( ville == null ) {
            return null;
        }
        return ville.value();
    }
}
