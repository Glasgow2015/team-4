package com.jpmorganchase.apiary;

import android.app.Activity;
import android.os.AsyncTask;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.Authenticator;
import java.net.HttpURLConnection;
import java.net.PasswordAuthentication;
import java.net.URL;
import android.widget.Button;
import android.view.*;
/**
 * Created by reni on 07/11/15.
 */
public class AuthActivity extends Activity {

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
                    // we were redirected! Kick the user out to the browser to sign on?
                }
            } catch (Exception e) {
                //TODO
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

    Button clickButton = (Button) findViewById(R.id.clickButton);
    clickButton.setOnClickListener( new OnClickListener() {
        @Override
        public void onClick (View v){
            // TODO Auto-generated method stub
        }
    });

}
