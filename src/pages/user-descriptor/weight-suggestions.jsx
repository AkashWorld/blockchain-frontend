import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import "./user-descriptor.css";

//----------------------------------------------------------------
const WEIGHTGAIN_SUGGESTIONS_QUERY = gql`
      {
        getWebsiteSuggestions(unitName: "weight", trend: gain, amount:6)
        {title,link}
      }
      `;

const WEIGHTLOSS_SUGGESTIONS_QUERY = gql`
      {
        getWebsiteSuggestions(unitName: "weight", trend: lose, amount:6)
        {title,link}
      }
      `; 

const WEIGHTMAINTAIN_SUGGESTIONS_QUERY = gql`
      {
        getWebsiteSuggestions(unitName: "weight", trend: maintain, amount:6)
        {title,link}
      }
      `;

function GET_WEIGHTGAIN_SUGGESTIONS() {
  const { loading, error, data } = useQuery(WEIGHTGAIN_SUGGESTIONS_QUERY);
 
  let status = {isLoading: false, isError: false, isData: false};
 
  if (loading) {
    status.isLoading = true;
    return {status, result: 'Loading...'};
  }
 
  if (error) {
    status.isError = true;
    return {status, result: `Error! ${error.message}`};
  }
 
  status.isData = true;
  return {status, result: data.getWebsiteSuggestions}
  ;
}

function GET_WEIGHTLOSS_SUGGESTIONS() {
  const { loading, error, data } = useQuery(WEIGHTLOSS_SUGGESTIONS_QUERY);
  
  let status = {isLoading: false, isError: false, isData: false};
  
  if (loading) {
    status.isLoading = true;
    return {status, result: 'Loading...'};
  }
  
  if (error) {
    status.isError = true;
    return {status, result: `Error! ${error.message}`};
  }
   
  status.isData = true;
  return {status, result: data.getWebsiteSuggestions}
  ;
}

function GET_WEIGHTMAINTAIN_SUGGESTIONS() {
  const { loading, error, data } = useQuery(WEIGHTMAINTAIN_SUGGESTIONS_QUERY);
   
  let status = {isLoading: false, isError: false, isData: false};
   
  if (loading) {
    status.isLoading = true;
    return {status, result: 'Loading...'};
  }
   
  if (error) {
    status.isError = true;
    return {status, result: `Error! ${error.message}`};
  }
   
  status.isData = true;
  return {status, result: data.getWebsiteSuggestions}
  ;
}

// --------------------------------------------------------------------------------
const USER_POUNDS_QUERY = gql`
      {
        getLatestUnitValue(unit: "lb")
      }
      `; 

function GET_USER_POUNDS() {
  const { loading, error, data } = useQuery(USER_POUNDS_QUERY);
 
  let status = {isLoading: false, isError: false, isData: false};
 
  if (loading) {
    status.isLoading = true;
    return {status, result: 'Loading...'};
  }
 
  if (error) {
    status.isError = true;
    return {status, result: `Error! ${error.message}`};
  }
 
  status.isData = true;
  return {status, result: data.getLatestUnitValue}
  ;
}
//---------------------------------------------------------------------

const AVG_POUNDS_QUERY = gql`
      {
        getAverageForUnit(unit: "lb")
      }
      `;

function GET_AVG_POUNDS() {
  const { loading, error, data } = useQuery(AVG_POUNDS_QUERY);
 
  let status = {isLoading: false, isError: false, isData: false};
 
  if (loading) {
    status.isLoading = true;
    return {status, result: 'Loading...'};
  }
 
  if (error) {
    status.isError = true;
    return {status, result: `Error! ${error.message}`};
  }
 
  status.isData = true;
  return {status, result: data.getAverageForUnit}
  ;
}

//---------------------------------------------------------------------

export function WeightSuggestions() {
  let userPoundsResult = GET_USER_POUNDS();
  let avgPoundsResult = GET_AVG_POUNDS();
  let suggPoundsGainResult = GET_WEIGHTGAIN_SUGGESTIONS();
  let suggPoundsLossResult = GET_WEIGHTLOSS_SUGGESTIONS();
  let suggPoundsMaintainResult = GET_WEIGHTMAINTAIN_SUGGESTIONS();

  if (userPoundsResult.status.isLoading || avgPoundsResult.status.isLoading
      || suggPoundsGainResult.status.isLoading || suggPoundsLossResult.status.isLoading 
      || suggPoundsMaintainResult.status.isLoading) return (
    <div>
      <h3>Loading...</h3>
      <div className="loader"></div>
    </div>
    )
 
  else if (userPoundsResult.status.isError || avgPoundsResult.status.isError
    || suggPoundsGainResult.status.isError || suggPoundsLossResult.status.isError 
    || suggPoundsMaintainResult.status.isError) return (
    <div>
    <h3>Something went wrong</h3>
    </div>
    )

  else if (userPoundsResult.status.isData && avgPoundsResult.status.isData
    && suggPoundsGainResult.status.isData && suggPoundsLossResult.status.isData 
    && suggPoundsMaintainResult.status.isData){

    let diffFromAvg = avgPoundsResult.result - userPoundsResult.result;
    let usedQueryResult;
    let diff;
    let trend;
    let action;

    if (diffFromAvg < -10) {// lose
        usedQueryResult = suggPoundsLossResult.result;
        diff = Math.abs(diffFromAvg);
        trend = 'above';
        action = 'lose';
    } else if (diffFromAvg > 10) { // gain
        usedQueryResult = suggPoundsGainResult.result;
        diff = diffFromAvg;
        trend = 'below';
        action = 'gain';
    } else { //maintain (10 pound buffer from average)
        usedQueryResult = suggPoundsMaintainResult.result;
        diff = Math.abs(diffFromAvg);
        trend = 'from';
        action = 'maintain'
    }

    let arrData = [];
    for (let i = 0; i < usedQueryResult.length; i++) {
        arrData.push(usedQueryResult[i].title);
        arrData.push(usedQueryResult[i].link);
    }

    return (
        <div>
          <br></br>
          <div>
            <font color='#331c05'>
              <b>
              Your weight: {userPoundsResult.result} pounds
              <br></br>
              Average: {avgPoundsResult.result.toFixed(2)}
              <br></br>
              Status: {diff.toFixed(2)} pounds {trend} average 
              <br></br>
              <br></br>
              Here are some resources on how to {action} weight.
              </b>
            </font>
          </div>
          <br></br>
          <div>{arrData[0]}</div>
          <div><a href={arrData[1]} target="_blank" rel="noopener noreferrer">Visit Site</a></div>
          <div>{arrData[2]}</div>
          <div><a href={arrData[3]} target="_blank" rel="noopener noreferrer">Visit Site</a></div>
          <div>{arrData[4]}</div>
          <div><a href={arrData[5]} target="_blank" rel="noopener noreferrer">Visit Site</a></div>
          <div>{arrData[6]}</div>
          <div><a href={arrData[7]} target="_blank" rel="noopener noreferrer">Visit Site</a></div>
          <div>{arrData[8]}</div>
          <div><a href={arrData[9]} target="_blank" rel="noopener noreferrer">Visit Site</a></div>
          <div>{arrData[10]}</div>
          <div><a href={arrData[11]} target="_blank" rel="noopener noreferrer">Visit Site</a></div>
        </div>
        )        
  }

  else return (
  <div>
  <h3>Something went really wrong</h3>
  </div>)
  }