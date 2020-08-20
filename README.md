
[![license](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](https://choosealicense.com/)

Univariate calibration for chemometrics (front-end).

#### Input file format

Input files are expected to be in a row-wise format where each row represents a sample.
The file should have no header or delimiters. Values in the same row should be seperated
with one or multiple spaces.

For prediction (test) data there should be one column for each replicate signal measured.
If one sample has less replicate measurments, use NaN instead.

For calibration data an additional column is added at the beginning, representing the
"known" (i.e.: assuming there is no error) value for the analyte concentration for in
that sample.

#### Performing calibration

 1. Click "Submit Data", choose "Calibration Data", upload a file and click "Save".
 2. At the top you'll be able to see the linear regression graph for the calibration data.
 3. To the left, in the "Change plot" section, clicking on "Residuals" will show a 
 residuals plot.
 4. And at the bottom, additional information is displayed. The "Linear Regression" table
 shows the values computed for the slope and intercept, along with their random errors and
 95% confidence intervals under the t-distribution.
 5. The "Linearity Test" table shows the result of performing an F-test under the null 
 hypothesis that the variance in the y-direction is not greater than the instrumental noise,
 and thus, that the data used in regression behave linearly.

![alt text](https://raw.githubusercontent.com/atmunr/UNIVAR_EJCR_R-GUI/master/readmefigures/calibration1.jpg)

![alt text](https://raw.githubusercontent.com/atmunr/UNIVAR_EJCR_R-GUI/master/readmefigures/calibration2.jpg)

#### Prediction of concentrations

1. Click "Submit Data", choose "Prediction Data", upload a file and click "Save".
2. At the bottom are shown the predicted concentration values, along with their random 
errors and 95% confidence intervals under the t-distribution.

![alt text](https://raw.githubusercontent.com/atmunr/UNIVAR_EJCR_R-GUI/master/readmefigures/prediction.jpg)
