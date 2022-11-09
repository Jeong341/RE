#include<iostream>
#include<string>
#include<iomanip>
using namespace std;
class Group
{
protected:

   int length; //时间长度
public:

 virtual void play()=0;//重放节目
};
class BoyGroup:public Group
{
	protected:
	char sort;
	int amount;
	public:
	BoyGroup()
	void play()
	{
		
	}
};
