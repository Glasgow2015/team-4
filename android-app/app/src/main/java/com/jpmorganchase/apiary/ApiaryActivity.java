package com.jpmorganchase.apiary;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.DatePicker;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Authenticator;
import java.net.HttpCookie;
import java.net.HttpURLConnection;
import java.net.PasswordAuthentication;
import java.net.URL;
import java.util.HashMap;

public class ApiaryActivity extends Activity implements View.OnClickListener {



    HashMap<String, String> json = new HashMap<String, String>();

    Button btnSendApiary;

    TextView txtApiaryName;
    DatePicker dateCommencing;
    CheckBox ckbJan;
    CheckBox ckbFeb;
    CheckBox ckbMar;
    CheckBox ckbApr;
    CheckBox ckbMay;
    CheckBox ckbJun;
    CheckBox ckbJul;
    CheckBox ckbAug;
    CheckBox ckbSep;
    CheckBox ckbOct;
    CheckBox ckbNov;
    CheckBox ckbDec;
    CheckBox ckbWater;
    CheckBox ckbMiombo;
    CheckBox ckbForests;
    CheckBox ckbGrass;
    CheckBox ckbForestPlantation;
    CheckBox ckbSisalPlantation;
    CheckBox ckbOrchard;
    CheckBox ckbMixed;
    CheckBox ckbPesticides;
    CheckBox ckbVehicle;
    CheckBox ckbCycle;
    CheckBox ckbFoot;
    CheckBox ckbNatural;
    CheckBox ckbTree;
    CheckBox ckbHeight;
    CheckBox ckbBeeHouse;
    CheckBox ckbBadger;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_apiary);

        btnSendApiary = (Button) findViewById(R.id.btnCreateApiary);

        txtApiaryName = (TextView) findViewById(R.id.txtApiaryName);
        dateCommencing = (DatePicker) findViewById(R.id.dateCommencing);
        ckbJan = (CheckBox) findViewById(R.id.ckbJan);
        ckbFeb = (CheckBox) findViewById(R.id.ckbFeb);
        ckbMar = (CheckBox) findViewById(R.id.ckbMar);
        ckbApr = (CheckBox) findViewById(R.id.ckbApr);
        ckbMay = (CheckBox) findViewById(R.id.ckbMay);
        ckbJun = (CheckBox) findViewById(R.id.ckbJun);
        ckbJul = (CheckBox) findViewById(R.id.ckbJul);
        ckbAug = (CheckBox) findViewById(R.id.ckbAug);
        ckbSep = (CheckBox) findViewById(R.id.ckbSep);
        ckbOct = (CheckBox) findViewById(R.id.ckbOct);
        ckbNov = (CheckBox) findViewById(R.id.ckbNov);
        ckbDec = (CheckBox) findViewById(R.id.ckbDec);
        ckbWater = (CheckBox) findViewById(R.id.ckbWater);
        ckbMiombo = (CheckBox) findViewById(R.id.ckbMiombo);
        ckbForests = (CheckBox) findViewById(R.id.ckbForests);
        ckbGrass = (CheckBox) findViewById(R.id.ckbGrass);
        ckbForestPlantation = (CheckBox) findViewById(R.id.ckbForestPlantation);
        ckbSisalPlantation = (CheckBox) findViewById(R.id.ckbSisalPlantation);
        ckbOrchard = (CheckBox) findViewById(R.id.ckbOrchard);
        ckbMixed = (CheckBox) findViewById(R.id.ckbMixed);
        ckbPesticides = (CheckBox) findViewById(R.id.ckbPesticides);
        ckbVehicle = (CheckBox) findViewById(R.id.ckbVehicle);
        ckbCycle = (CheckBox) findViewById(R.id.ckbCycle);
        ckbFoot = (CheckBox) findViewById(R.id.ckbFoot);
        ckbNatural = (CheckBox) findViewById(R.id.ckbNatural);
        ckbTree = (CheckBox) findViewById(R.id.ckbTree);
        ckbHeight = (CheckBox) findViewById(R.id.ckbHeight);
        ckbBeeHouse = (CheckBox) findViewById(R.id.ckbBeeHouse);
        ckbBadger = (CheckBox) findViewById(R.id.ckbBadger);

        btnSendApiary.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnCreateApiary:
                json.put("name", txtApiaryName.getText().toString());
                json.put("year", Integer.toString(dateCommencing.getYear()));

                String months = "";
                months += ckbJan.isEnabled() ? "1," : "";
                months += ckbFeb.isEnabled() ? "2," : "";
                months += ckbMar.isEnabled() ? "3," : "";
                months += ckbApr.isEnabled() ? "4," : "";
                months += ckbMay.isEnabled() ? "5," : "";
                months += ckbJun.isEnabled() ? "6," : "";
                months += ckbJul.isEnabled() ? "7," : "";
                months += ckbAug.isEnabled() ? "8," : "";
                months += ckbSep.isEnabled() ? "9," : "";
                months += ckbOct.isEnabled() ? "10," : "";
                months += ckbNov.isEnabled() ? "11," : "";
                months += ckbDec.isEnabled() ? "12" : "";
                json.put("months", months);

                json.put("water", Boolean.toString(ckbWater.isEnabled()));
                json.put("miombo", Boolean.toString(ckbMiombo.isEnabled()));
                json.put("forests", Boolean.toString(ckbForests.isEnabled()));
                json.put("grass", Boolean.toString(ckbGrass.isEnabled()));
                json.put("forestPlantation", Boolean.toString(ckbForestPlantation.isEnabled()));
                json.put("sisalPlantation", Boolean.toString(ckbSisalPlantation.isEnabled()));
                json.put("orchard", Boolean.toString(ckbOrchard.isEnabled()));
                json.put("mixed", Boolean.toString(ckbMixed.isEnabled()));
                json.put("pesticides", Boolean.toString(ckbPesticides.isEnabled()));
                json.put("vehicle", Boolean.toString(ckbVehicle.isEnabled()));
                json.put("cycle", Boolean.toString(ckbCycle.isEnabled()));
                json.put("foot", Boolean.toString(ckbFoot.isEnabled()));
                json.put("natural", Boolean.toString(ckbNatural.isEnabled()));
                json.put("tree", Boolean.toString(ckbTree.isEnabled()));
                json.put("height", Boolean.toString(ckbHeight.isEnabled()));
                json.put("beeHouse", Boolean.toString(ckbBadger.isEnabled()));

                StoreApiary task = new StoreApiary();
                task.execute();

                break;
        }
    }

    protected class StoreApiary extends AsyncTask<Object, Void, Long> {



        protected Long doInBackground(Object... x) {
            try {
                String url="http://ec2-54-216-204-98.eu-west-1.compute.amazonaws.com:8080/api/apiary/create";
                URL object=new URL(url);

                HttpURLConnection con = (HttpURLConnection) object.openConnection();
                con.setDoOutput(true);
                con.setDoInput(true);
                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestProperty("Accept", "application/json");
                HttpCookie httpCookie = Cookie.manager.getCookieStore().getCookies().get(0);
                con.setRequestProperty("Cookie", httpCookie.toString());
                //String userpass = "";//username + ":" + password;
                //String basicAuth = "Basic " + new String(Base64.encode(userpass.getBytes("UTF-8"), Base64.DEFAULT));
               // con.setRequestProperty ("Authorization", basicAuth);
                con.setRequestMethod("POST");

                //Send request
                DataOutputStream wr = new DataOutputStream(con.getOutputStream ());
                wr.writeBytes("{\"lat\":0, \"lon\":0, \"year\":2010, \"name\":\"TanzaneanApiary\"}");
                wr.flush();
                wr.close ();

               /* OutputStreamWriter wr = new OutputStreamWriter(con.getOutputStream());
                wr.
                wr.flush();*/

                StringBuilder sb = new StringBuilder();
                int HttpResult = con.getResponseCode();
                if(HttpResult == HttpURLConnection.HTTP_OK){
                    BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(),"utf-8"));
                    String line = null;
                    while ((line = br.readLine()) != null) {
                        sb.append(line + "\n");
                    }

                    br.close();

                    System.out.println(""+sb.toString());

                }else{
                    Log.e("Bees", con.getResponseMessage());
                }
            } catch (Exception e) {
                Log.e("Bees", e.getMessage());
            }

            return null;
        }

        protected void onPostExecute(Long result) {
            json.clear();
        }
    }
}
