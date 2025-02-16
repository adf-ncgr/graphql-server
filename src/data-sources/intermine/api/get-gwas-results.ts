import { intermineConstraint, interminePathQuery } from '../intermine.server.js';
import {
  GraphQLGeneticMarker,
  GraphQLGWAS,
  GraphQLGWASResult,
  GraphQLTrait,
  IntermineGWASResultResponse,
  intermineGWASResultAttributes,
  intermineGWASResultSort,
  response2gwasResults,
} from '../models/index.js';


export type GetGWASResultsOptions = {
  gwas?: GraphQLGWAS;
  trait?: GraphQLTrait;
  geneticMarker?: GraphQLGeneticMarker;
}


// get GWASResults for a GWAS, Trait, GeneticMarker
export async function getGWASResults({gwas, trait, geneticMarker}: GetGWASResultsOptions)
: Promise<GraphQLGWASResult[]> {
    const constraints = [];
    if (gwas) {
        const gwasConstraint = intermineConstraint('GWASResult.gwas.id', '=', gwas.id);
        constraints.push(gwasConstraint);
    }
    if (trait) {
        const traitConstraint = intermineConstraint('GWASResult.trait.id', '=', trait.id);
        constraints.push(traitConstraint);
    }
    if (geneticMarker) {
        const geneticMarkerConstraint = intermineConstraint('GWASResult.markers.id', '=', geneticMarker.id);
        constraints.push(geneticMarkerConstraint);
    }
    const query = interminePathQuery(
        intermineGWASResultAttributes,
        intermineGWASResultSort,
        constraints,
    );
    return this.pathQuery(query)
        .then((response: IntermineGWASResultResponse) => response2gwasResults(response));
}
