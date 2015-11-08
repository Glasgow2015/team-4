package com.jpmorganchase.apiary;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends Activity implements View.OnClickListener {

    Button btnCreateApiary;
    Button btnCreateHive;
    Button btnCreateInspection;
    Button btnHarvest;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnCreateApiary = (Button) findViewById(R.id.btnCreateApiary);
        btnCreateHive = (Button) findViewById(R.id.btnCreateHive);
        btnCreateInspection = (Button) findViewById(R.id.btnCreateInspection);
        btnHarvest = (Button) findViewById(R.id.btnHarvest);

        btnCreateApiary.setOnClickListener(this);
        btnCreateHive.setOnClickListener(this);
        btnCreateInspection.setOnClickListener(this);
        btnHarvest.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        Intent intent = null;

        switch (v.getId()) {
            case R.id.btnCreateApiary:
                intent = new Intent(this, ApiaryActivity.class);
                break;
            case R.id.btnCreateHive:
                intent = new Intent(this, HiveActivity.class);
                break;
            case R.id.btnCreateInspection:
                intent = new Intent(this, InspectionActivity.class);
                break;
            case R.id.btnHarvest:
                intent = new Intent(this, HarvestActivity.class);
                break;
        }

        startActivity(intent);
    }
}
