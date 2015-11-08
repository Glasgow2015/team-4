package com.jpmorganchase.apiary;

import android.app.Activity;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.Authenticator;
import java.net.HttpURLConnection;
import java.net.PasswordAuthentication;
import java.net.URL;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Button clickButton = (Button) findViewById(R.id.btnLogin);
        clickButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });
    }

    private class Logging extends AsyncTask<URL, Void, Long> {

        String username;
        String password;

        Logging(String username, String password) {
            super();
            this.username = username;
            this.password = password;
        }

        protected Long doInBackground(URL... url) {
            HttpURLConnection urlConnection;
            try {
                urlConnection = (HttpURLConnection) url[0].openConnection();
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());

                if (!url[0].getHost().equals(urlConnection.getURL().getHost())) {

                }
            } catch (Exception e) {

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
