package com.jpmorganchase.apiary;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.HttpAuthHandler;
import android.widget.Button;
import com.google.gson.annotations.SerializedName;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    Button btnCreateApiary;
    Button btnCreateHive;
    Button btnCreateInspection;
    Button syncButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnCreateApiary = (Button) findViewById(R.id.btnCreateApiary);
        btnCreateHive = (Button) findViewById(R.id.btnCreateHive);
        btnCreateInspection = (Button) findViewById(R.id.btnCreateInspection);

        btnCreateApiary.setOnClickListener(this);
        btnCreateHive.setOnClickListener(this);
        btnCreateInspection.setOnClickListener(this);
    }

    public void syncButtonPressed() {
        try {

            URL url = new URL("http://localhost:1337/");

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            OutputStreamWriter writer = new OutputStreamWriter(
                    connection.getOutputStream());

            //writer.write("message=" + message);
            writer.close();

            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
            } else {

            }
        } catch (MalformedURLException e) {
            // ...
        } catch (IOException e) {
            // ...

        }
    }


    @Override
    public void onClick(View v) {
        Intent intent = null;

        switch (v.getId()) {
            case R.id.btnCreateApiary:
                intent = new Intent(this, HiveActivity.class);
                break;
            case R.id.btnCreateHive:
                intent = new Intent(this, HiveActivity.class);
                break;
            case R.id.btnCreateInspection:
                //intent = new Intent(this, InspectionActivity.class);
                break;
            case R.id.button4:
                syncButtonPressed();
                break;
        }

        startActivity(intent);
    }
}
