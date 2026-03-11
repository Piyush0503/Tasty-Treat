package com.tasty.treat.request;

import java.util.List;
import com.tasty.treat.model.CartItem;

public class SyncCartRequest {
    private List<CartItem> items;

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }
}
