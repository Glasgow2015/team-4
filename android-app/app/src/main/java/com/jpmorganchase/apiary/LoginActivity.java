package com.jpmorganchase.apiary;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
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
import java.net.CookieManager;
import java.net.HttpCookie;
import java.net.HttpURLConnection;
import java.net.PasswordAuthentication;
import java.net.URL;
import java.util.List;
import java.util.Map;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Button clickButtonL = (Button) findViewById(R.id.btnLogin);
        clickButtonL.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText username = (EditText) findViewById(R.id.name);
                EditText password = (EditText) findViewById(R.id.pswd);
                String url="http://ec2-54-216-204-98.eu-west-1.compute.amazonaws.com:8080/api/auth/local/login";

                AsyncTask log = new Logging(url, username.getText().toString(), password.getText().toString(), "GET");

                log.execute(null);
            }
        });

        Button clickButtonR = (Button) findViewById(R.id.btnRegister);
        clickButtonR.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText username = (EditText) findViewById(R.id.regName);
                EditText password = (EditText) findViewById(R.id.regPswd);
                String url="http://ec2-54-216-204-98.eu-west-1.compute.amazonaws.com:8080/api/auth/local/register";

                AsyncTask log = new Logging(url, username.getText().toString(), password.getText().toString(),"POST");

                log.execute(null);
            }
        });
    }

    protected class Logging extends AsyncTask<Object, Void, Long> {
        static final String COOKIES_HEADER = "Set-Cookie";

        String username;
        String password;
        String url;
        String requestMethod;

        Logging(String url, String username, String password, String requestMethod) {
            super();
            this.url = url;
            this.username = username;
            this.password = password;
            this.requestMethod = requestMethod;
        }

        protected Long doInBackground(Object... x) {
            try {
                URL object=new URL(url);

                HttpURLConnection con = (HttpURLConnection) object.openConnection();
                con.setDoOutput(true);
                con.setDoInput(true);
                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestProperty("Accept", "application/json");
                String userpass = username + ":" + password;
                String basicAuth = "Basic " + new String(Base64.encode(userpass.getBytes("UTF-8"), Base64.DEFAULT));
                con.setRequestProperty ("Authorization", basicAuth);
                con.setRequestProperty("Cookie", TextUtils.join(";", Cookie.manager.getCookieStore().getCookies()));
                con.setRequestMethod(requestMethod);

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


                    Map<String, List<String>> headerFields = con.getHeaderFields();
                    List<String> cookiesHeader = headerFields.get(COOKIES_HEADER);

                    if(cookiesHeader != null)
                    {
                        for (String cookie : cookiesHeader)
                        {
                            Cookie.manager.getCookieStore().add(null, HttpCookie.parse(cookie).get(0));
                        }
                    }

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
            Intent myIntent = new Intent(LoginActivity.this, MainActivity.class);
            startActivity(myIntent);
        }
    }
}
