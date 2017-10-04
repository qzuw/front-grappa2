// external modules
import test from 'ava';
import sinon from 'sinon';
import { actionTest } from 'redux-ava';

// internal modules
import * as API from '../../src/util/apiConnection';
import { 
    saveAttempt, 
    saveSuccess, 
    saveFailure, 
    saveContract, 
    CONTRACT_SAVE_ATTEMPT,
    CONTRACT_SAVE_SUCCESS,
    CONTRACT_SAVE_FAILURE 
} from '../../src/components/contract/ContractActions';

const contractTestData = { some: 'data' };

const callApiStub = sinon.stub(API, 'callApi').withArgs('/contract', 'post', contractTestData)
    .returns(Promise.resolve(contractTestData));

const initialState = [];
const stateWithSuccessSave = [{ id: 'CONTRACT_SAVE_SUCCESS', text: 'Sopimus talletettu onnistuneesti', completed: true }];
const stateWithFailedSave = [{ id: 'CONTRACT_SAVE_FAILURE', text: 'Sopimuksen talletus epäonnistui', completed: true}];
const stateWithAttemptedSave = [{ id: 'CONTRACT_SAVE_ATTEMPT', text: 'Sopimuksen talletus käynnistetty', completed: false }];


test('saveSuccess returns correct type', actionTest(
    saveSuccess,
    contractTestData,
    { type: CONTRACT_SAVE_SUCCESS, text: 'Sopimus talletettu onnistuneesti' },
));

test('saveFailure returns correct type', actionTest(
    saveFailure,
    contractTestData,
    { type: CONTRACT_SAVE_FAILURE, text: 'Sopimuksen talletus epäonnistui' },
));

test('saveAttempt returns correct type', actionTest(
    saveAttempt,
    contractTestData,
    { type: CONTRACT_SAVE_ATTEMPT, text: 'Sopimuksen talletus käynnistetty' },
));

test.skip('saveContract returns correct type', actionTest(
    //kunnon kamaa tänne
));
/*
CONTRACT_SAVE_ATTEMPT
CONTRACT_SAVE_SUCCESS
CONTRACT_SAVE_FAILURE
*/
