package com.jpmorganchase.apiary;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {


    Button newApiaryButton;
    Button newHiveButton;
    Button newInspectionButton;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        newApiaryButton = (Button) findViewById(R.id.button);
        newApiaryButton.setOnClickListener(this);
        newHiveButton = (Button) findViewById(R.id.button2);
        newHiveButton.setOnClickListener(this);
        newInspectionButton = (Button) findViewById(R.id.button3);
        newInspectionButton.setOnClickListener(this);
    }

    private void apiaryButtonClicked()
    {
        startActivity(new Intent("jpmorganchase.apiary"));
    }

    private void hiveButtonClicked()
    {
        startActivity(new Intent("jpmorganchase.hive"));
    }

    private void newInspectionButtonClicked()
    {
        startActivity(new Intent("jpmorganchase.newInspection"));
    }

    public void onClick(View v)
    {
        switch(v.getId())
        {
            case R.id.button:
                apiaryButtonClicked();
                break;
            case R.id.button2:
                hiveButtonClicked();
                break;
            case R.id.button3:
            newInspectionButtonClicked();
            break;
        }
    }


}
