package com.jpmorganchase.apiary;

import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Authenticator;
import java.net.HttpURLConnection;
import java.net.PasswordAuthentication;
import java.net.URL;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Button clickButton = (Button) findViewById(R.id.btnLogin);
        clickButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText username = (EditText) findViewById(R.id.name);
                EditText password = (EditText) findViewById(R.id.pswd);

                AsyncTask log = new Logging(username.getText().toString(), password.getText().toString());

                log.execute(null);
            }
        });
    }

    protected class Logging extends AsyncTask<Object, Void, Long> {

        String username;
        String password;

        Logging(String username, String password) {
            super();
            this.username = username;
            this.password = password;
        }

        protected Long doInBackground(Object... x) {
            try {
                String url="http://ec2-54-216-204-98.eu-west-1.compute.amazonaws.com:8080/api/auth/local/register";
                URL object=new URL(url);

                HttpURLConnection con = (HttpURLConnection) object.openConnection();
                con.setDoOutput(true);
                con.setDoInput(true);
                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestProperty("Accept", "application/json");
                String userpass = username + ":" + password;
                String basicAuth = "Basic " + new String(Base64.encode(userpass.getBytes("UTF-8"), Base64.DEFAULT));
                con.setRequestProperty ("Authorization", basicAuth);
                con.setRequestMethod("POST");

                OutputStreamWriter wr = new OutputStreamWriter(con.getOutputStream());
                wr.flush();

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
            } finally {
            }

            Authenticator.setDefault(new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password.toCharArray());

                }
            });
            return null;
        }

        protected void onPostExecute(Long result) {

        }
    }
}
