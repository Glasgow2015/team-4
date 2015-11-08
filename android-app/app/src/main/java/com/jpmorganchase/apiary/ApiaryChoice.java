package com.jpmorganchase.apiary;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;

import java.util.Vector;

public class ApiaryChoice extends AppCompatActivity implements View.OnClickListener{

    Button btnCreateNewApiary;
    Button btnForApiary;
    Intent intent = null;
    Vector<Apiaries> apiaries = new Vector<Apiaries>(10, 5);
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_apiary_choice);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
        btnCreateNewApiary = (Button) findViewById(R.id.button4);
        btnCreateNewApiary.setOnClickListener(this);
        btnForApiary = (Button)findViewById(R.id.button3);
    }


    private void createNewApiary()
    {

        apiaries.add(new Apiaries("First Apiary"));
        intent = new Intent(this, ApiaryActivity.class);
        startActivity(intent);
        btnForApiary.setText("First Apiary");
    }

    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.button4:
                createNewApiary();
                break;
        }
    }

}
