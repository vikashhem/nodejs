#include <bits/stdc++.h>
using namespace std;


int n;

int fact(int n)
{
    if(n==0){
        return 1;
    }
    return n*fact(n-1);
}
    
signed main() 
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cin>>n;
    cout<<fact(n);
    return 0;
}
