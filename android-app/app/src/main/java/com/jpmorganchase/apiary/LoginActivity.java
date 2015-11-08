package com.jpmorganchase.apiary;

import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.Authenticator;
import java.net.HttpURLConnection;
import java.net.PasswordAuthentication;
import java.net.URL;

public class LoginActivity extends AppCompatActivity {
    static String host = "http://www.google.com/";

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
            HttpURLConnection urlConnection;
            try {
                URL conn = new URL(host);
                urlConnection = (HttpURLConnection) conn.openConnection();
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                System.out.println(urlConnection.getResponseMessage());

                if (!conn.getHost().equals(urlConnection.getURL().getHost())) {

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
